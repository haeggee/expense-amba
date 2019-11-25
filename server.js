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

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/overview'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }
};

// A route to login and create a session
app.post('/users/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password).then((user) => {
        if (!user) {
            res.redirect('/');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            res.redirect('/overview');
        }
    }).catch((error) => {
        res.status(400).redirect('/login');
    })
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.redirect('/')
        }
    })
})

// A route to check if a user is logged in on the session cookie
app.get('/users/check-session', (req, res) => {
    // Remove the session
    if (req.session.user) {
        res.send({ screen: 'auth' });
    } else {
        res.redirect('/')
    }
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
app.get('/login', sessionChecker, (req, res) => {
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
        res.sendFile(__dirname + '/build/index.html')
    } else {
        res.redirect('/login')
    }

})

/*********************************************************/

/*** API Routes below ************************************/

//a helper that gets the corresponding resource by id and sends it back to the client
function returnResById(model, id, res) {
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    model.findById(id).then(
        result => {
            console.log("result", result)
            if (!result) {
                res.status(404).send()
            }
            else {
                res.send(result)
            }
        },
        err => {
            res.status(400).send(err)
        }
    )
}

// a POST route to *create* a group
app.post('/group', (req, res) => {
    const group = new Group({
        name: req.body.name,
        members: [],
        bills: []
    })
    req.body.members.forEach(member => {
        group.members.push(member)
    })
    req.body.bills.forEach(billId => {
        group.bills.push(billId)
    })
    group.save().then(
        (result) => {
            res.send(result)
        },
        (err) => {
            res.status(400).send(err)
        }
    )
})



/// a GET route to get a group by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but you can make your own id system for your project)
app.get('/group/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }
    Group.findById(id).populate('members.user').then(
        result => {
            if (!result) {
                res.status(404).send()
            }
            else {
                res.send(result)
            }
        },
        err => {
            res.status(500).send(err) // server error
        }
    )
})

/// a DELETE route to remove a group by their id.
app.delete('/group/:id', (req, res) => {
    const id = req.params.id
    // TODO
})

app.delete('/bill/:id', (req, res) => {
    const id = req.params.id
    // TODO
})

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/user/:id', (req, res) => {
    const id = req.params.id
    // TODO
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
    User.find().then(
        (users) => {
            res.send(users)
        },
        (error) => {
            res.status(500).send(error) // server error
        }
    )
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})







