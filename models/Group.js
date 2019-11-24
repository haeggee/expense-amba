const mongoose = require('mongoose')
const BillSchema = require('./Bill')

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: false
    },
    members: [{
        userID: String,
        balance: Number
    }],
    bills: [BillSchema]
})

const Group = new mongoose.model('Group', GroupSchema)

module.exports = {Group}
