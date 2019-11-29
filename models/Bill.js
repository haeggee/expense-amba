const mongoose = require('mongoose')

const BillSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    payer: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    payees: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        }
    ],
    group: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Group'
    }

})

const Bill = new mongoose.model('Bill', BillSchema)
module.exports = {Bill}