
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 1,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 1,
        required: true
    },
    email: {
        type: String,
        minlength: 1,
        required: true,
        unique: true
    },
    groupIDs: {
        type: [String]
    }
})

UserSchema.pre('save', function(next) {
    const user = this;


    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
    const User = this // binds this to the User model

    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject()  // a rejected promise
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

const User = new mongoose.model('User', UserSchema)
module.exports = {User}