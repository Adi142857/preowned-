const moongose = require('mongoose')

const requirementSchema = new moongose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    category: [{
        type: String,
        required: true
    }],
    links: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
})

module.exports = moongose.model('Requirement', requirementSchema)