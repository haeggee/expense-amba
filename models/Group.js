const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    members: [{
        user:{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        },
        balance: Number
    }],
    bills: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Bill'
    }]
})

const Group = new mongoose.model('Group', GroupSchema)

module.exports = {Group}
