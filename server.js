'use strict';
const log = console.log

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// import the mongoose models
const { Bill } = require('./models/Bill')
const { User } = require('./models/User')
const { Group } = require('./models/Group')

// to validate object IDs
const { ObjectID } = require('mongodb')

// cors to bypass security
const cors = require('cors');
app.use(cors());

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));


/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));


// A route to login and create a session
app.post('/users/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password).then((user) => {
        if (!user) {
            res.status(400).send()
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            user.populate('groups').populate('groups.bills').populate('groups.groupMembers.user', ['username', 'name']).execPopulate().then(
                result => {
                    res.send(result)
                }
            )
        }
    }).catch((error) => {
        res.status(400).send()
    })
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.send()
        }
    })
})

// A route to check if a user is logged in on the session cookie
app.get('/users/check-session', (req, res) => {
    // Remove the session
    if (req.session.user) {
        res.send({ id: req.session.user });
    } else {
        res.status(401).send();
    }
})


/*********************************************************/

/*** API Routes below ************************************/


/**
 * a POST route to *create* a group
 * body should be in the format:
 * {
 *     name: name,
 *     groupMembers: a list of users with _id field included
 * }
  */
//TODO: add group to its groupMembers' field
app.post('/group', (req, res) => {
    const group = new Group({
        name: req.body.name,
        groupMembers: [],
        bills: []
    })

    req.body.groupMembers.forEach(user => {
        group.groupMembers.push({ user: user._id, balance: 0 })
    })
    group.save().then((result) => {

        // add group id to each group member
        req.body.groupMembers.forEach(id => {
            User.findByIdAndUpdate(id, { $addToSet: { groups: { $each: [result._id] } } }, { new: true }).then((u) => {
            })
        })
        return result
    }).then(result => {
        res.send(result)
    }).catch(error => {
        res.status(400).send(error)
    })

    // const userIDs = req.body.users.map((user)=>user._id)
    // User.updateMany({_id: {$in: userIDs}}, {$addToSet: {groups: group._id}})
})

/// a GET route to get a group by their id.
// only 'name' and 'username' fields of users are populated.
app.get('/group/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    Group.findById(id).populate('groupMembers.user', ['name', 'username']).then(
        result => {
            if (!result) {
                res.status(404).send()
            }
            else {
                res.send(result)
            }
        }, (err) => {
            res.status(500).send(err) // this should be 500 for server error
        }
    )
})

/**
 * the body should look like
 * {
 *     addUsers: an array of users to be added
 * }
 * the group is returned as response.
 * note that only 'name' and 'username' fields are populated for users
 */
app.patch('/group/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()

    } else {
        const userIDs = req.body.addUsers.map((user) => user._id)
        Group.findById(id).then(group => {
            User.find({ _id: { $in: userIDs } }).then(users => {
                const groupMembers = users.map((user) => { return { user: user._id, balance: 0 } })
                Group.findByIdAndUpdate(id, { $addToSet: { groupMembers: { $each: groupMembers } } }, { new: true }).then(result => {
                    return result.populate('groupMembers.user', ['name', 'username']).execPopulate()
                }).then(result => {
                    res.send(result)
                })
                User.updateMany({ _id: { $in: userIDs } }, { $addToSet: { groups: group._id } })
            })
        }).catch(error => {
            res.status(404).send(error)
        })

    }
})

/// a DELETE route to remove a group by their id.
app.delete('/group/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    Group.findByIdAndRemove(id).then((group) => {
        if (!group) { res.status(404).send() }
        else {
            // remove all the bills in the group
            group.bills.forEach(billId => {
                Bill.findByIdAndRemove(billId)
            })
            res.send(group)
        }
    }).catch((error) => {
        res.status(500).send() // this should be 500 for server error
    })
})

/**
 * post a new bill
 * format:
 * {
 *     title: title
 *     amount: amount
 *     date: Date
 *     payer: user who pays
 *     payees : array of users who was paid for
 *     group: the group which this bill belongs to
 * }
 */
app.post('/bills', (req, res) => {
    const bill = new Bill({
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
        payer: req.body.payer._id,
        payees: [],
        group: req.body.group._id
    })
    req.body.payees.forEach(payee => {
        bill.payees.push(payee._id)
    })
    bill.save().then((bill) => {
        // update groups array
        Group.findById(bill.group).then((group) => {
            if (!group) {
                res.status(404).send()
            } else {
                group.bills.push(bill._id)
                // save the group
                group.save().then(null, (err) => {
                    res.status(500).send(err)
                })
            }
        })
        bill.populate('payer', 'name').populate('payees', 'name').populate('group').execPopulate().then(
            res.send(bill)
        )
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.delete('/bills/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    Bill.findByIdAndRemove(id).then((bill) => {
        // remove bill from group
        Group.findById(bill.group).then((group) => {
            if (!group) {
                res.status(404).send()
            } else {
                // remove bill from bills array
                const index = group.bills.indexOf(id)
                group.bills.splice(index, 1)
                // save the group
                group.save().then(null, (err) => {
                    res.status(400).send(err)
                })
            }
        })
        res.send(bill)
    }).catch((error) => {
        res.status(500).send() // this should be 500 for server error
    })
})



/** User routes below **/
// Set up a POST route to *create* a user of the web app 
app.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        groups: []
    })
    user.save().then(
        (result) => {
            res.send(result)
        },
        (err) => {
            res.status(400).send(err)
        }
    )
})

// patch to change user attributes
app.patch('/users', (req, res) => {

    const { name, username, password, email } = req.body
    const body = { name, username, password, email }
    // Update the student by their id.
    User.findOneAndUpdate({ username: username }, body).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(400).send() // bad request for changing the user
    })

})


/// a GET route to get a user by their id.
app.get('/users/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    User.findById(id).then(
        user => {
            if (!user) {
                res.status(404).send()
            }
            else {
                user.populate('groups').populate('groups.bills').populate('groups.groupMembers.user', ['username', 'name']).execPopulate().then(
                    result => {
                        res.send(result)
                    }
                )
            }
        }, (err) => {
            res.status(500).send(err)
        }
    )
})

// get all users
app.get('/users', (req, res) => {

    User.find({}, function(err, users) {
        res.send(users);
    });
})

/*** Webpage routes below **********************************/
// Inject the sessionChecker middleware to any routes that require it.
// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that your users have a proper experience on the front-end.

// static js directory
app.use("/js", express.static(__dirname + '/public/js'))


app.use(express.static(__dirname + '/build'))

// // login route serves the login page
// app.get('/login', (req, res) => {
//     if (req.session.user) {
//         res.redirect('/overview') // if already logged in, go to overview
//     } else {
//         res.sendFile(__dirname + '/build/index.html')
//     }
// })


// overview, accountsview and admin routes will check if the user is logged in

// Overview: only send if user logged in is not admin
app.get('/overview', (req, res) => {
    if (req.session.user) {
        User.findById(req.session.user).then(
            user => {
                if (user.username !== 'admin') {
                    res.sendFile(__dirname + '/build/index.html')
                } else {
                    res.redirect('/admin') // go to admin page
                }
            }
        ).catch(error => {
            res.status(500).send(error) // server error
        })
    } else {
        res.redirect('/login')
    }
})

// accountsview for all logged in users
app.get('/accountsview', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/build/index.html')
    } else {
        res.redirect('/login')
    }
})

// admin page only if logged in user is admin
app.get('/admin', (req, res) => {
    if (req.session.user) {
        User.findById(req.session.user).then(
            user => {
                if (user.username === 'admin') {
                    res.sendFile(__dirname + '/build/index.html')
                } else {
                    res.redirect('/overview')
                }
            }
        ).catch(error => {
            res.status(500).send(error) // server error
        })
    } else {
        res.redirect('/login')
    }
})
// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})
