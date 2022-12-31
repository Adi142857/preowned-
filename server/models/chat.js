const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    bookId: {
        ref: 'Book',
        type: mongoose.Schema.Types.ObjectId
    },
    users: [{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }],
    messages: [{
        by: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        },
        message: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)