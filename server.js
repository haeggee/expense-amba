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

app.use(express.static(__dirname + '/build'))

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
            res.send(user)
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
        res.redirect('/')
    }
})


/*********************************************************/

/*** API Routes below ************************************/


/**
 * a POST route to *create* a group
 * body should be in the format:
 * {
 *     name: name,
 *     users: a list of users with _id field included
 * }
  */

app.post('/group', (req, res) => {
    const group = new Group({
        name: req.body.name,
        members: [],
        bills: []
    })
    req.body.users.forEach(user => {
        group.members.push({user: user._id, balance: 0})
    })
    group.save().then(
        (result) => {
            return result.populate('members.user', 'name').execPopulate()
        }
    ).then(result =>{
        res.send(result)
    }).catch(error => {
        res.status(400).send(error)
    })
})

/// a GET route to get a group by their id.
// only 'name' and 'username' fields of users are populated.
app.get('/group/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    Group.findById(id).populate('members.user', ['name', 'username']).then(
        result => {
            if (!result) {
                res.status(404).send()
            }
            else {
                res.send(result)
            }
        }, (err) => {
            res.status(400).send(err) // this should be 500 for server error
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
    if (!ObjectID.isValid(id)){
        res.status(404).send()
    }else {
        const memberArray = req.body.addUsers.map((user) => {return {user: user._id, balance: 0}})
        Group.findByIdAndUpdate(id, {$addToSet: {members: {$each: memberArray}}}).then(
            result => {
                return result.populate('members.user', ['name', 'username']).execPopulate()
            }
        ).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(400).send(error)
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
        if (!group) {res.status(404).send()}
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

// POST a new bill.
app.post('/bill', (req, res) => {
    const bill = new Bill({
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
        payerID: req.body.payerID,
        payeeIDs: req.body.payeeIDs,
        group: req.body.group
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
        res.send(bill)
    }, (error) => {
        res.status(500).send()
    })
})

app.delete('/bill/:id', (req, res) => {
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

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/user/:id', (req, res) => {
    const id = req.params.id
    // for best practice
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
    const { name, username, password, email, groups } = req.body
    const body = { name, username, password, email, groups }
    // Update the student by their id.
    User.findByIdAndUpdate(id, { $set: body }, { new: true }).then((user) => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(400).send() // bad request for changing the user
    })

})


/** User routes below **/
// Set up a POST route to *create* a user of the web app 
app.post('/users', (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
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

// for test only
// get all users
app.get('/users', (req, res) => {
    User.find(undefined, {name: 1, username: 1}).then(
        (users) => {
            res.send(users)
        },
        (error) => {
            res.status(500).send(error) // server error
        }
    )
})

/*** Webpage routes below **********************************/
// Inject the sessionChecker middleware to any routes that require it.
// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that your users have a proper experience on the front-end.

//***             open question: redirects do not work together with react-router-dom;
//***             will probably have to use redirect features of react-router-dom*/

// static js directory
app.use("/js", express.static(__dirname + '/public/js'))

// // login route serves the login page
app.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/overview') // if already logged in, go to overview
    } else {
        res.sendFile(__dirname + '/build/index.html')
    }
})

// overview, accountsview and admin routes will check if the user is logged in and server
app.get('/overview', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/build/index.html')
    } else {
        res.redirect('/login')
    }

})

app.get('/accountsview', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/build/index.html')
    } else {
        res.redirect('/login')
    }
})

app.get('/admin', (req, res) => {
    if (req.session.user) {
        // another check needed to see if user actually is admin
        res.sendFile(__dirname + '/build/index.html')
    } else {
        res.redirect('/login')
    }
})
// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})
