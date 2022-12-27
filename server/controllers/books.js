const Book = require('../models/book')
const debug = require('debug')('backend:bookController')

module.exports = {
    getBooks: async (req, res) => {
        Book.find((err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    getBook: async (req, res) => {
        Book.findById(req.params.id, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    createBook: async (req, res) => {
        const book = new Book({
            ...req.body,
            user: req.userId
        });
        book.save((err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    updateBook: async (req, res) => {
        Book.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, { new: true }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        })
    },
    deleteBook: async (req, res) => {
        Book.findByIdAndDelete(req.params.id, (err, doc) => {
            if (!doc) {
                res.status(404).json({
                    message: 'Book not found'
                });
                return;
            }
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json({
                message: 'Book deleted successfully'
            });
        });
    },
    myBooks: async (req, res) => {
        Book.find({ user: req.userId }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    getChatByBook: async (req, res) => {
        Chat.find({
            bookId: req.params.id,
            users: req.userId
        }).populate('users', 'username')
            .populate('messages.by', 'username').exec((err, doc) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                    return;
                }
                res.status(200).json(doc);
            });
    },
    getOrCreateChat: async (req, res) => {
        const book = await Book.findById(req.body.bookId);
        if (!book) {
            res.status(404).json({
                message: 'Book not found'
            });
            return;
        }

        const existingChat = await Chat.findOne({
            bookId: req.body.bookId,
            users: req.userId
        }).populate('users', 'username')
            .populate('messages.by', 'username');

        if (existingChat) {
            res.status(200).json(existingChat);
            return;
        }

        const chat = new Chat({
            bookId: req.body.bookId,
            users: [
                req.userId,
                book.user
            ]
        });
        chat.save().then(doc => {
            doc.populate('users', 'username').populate('messages.by', 'username').execPopulate().then(doc => {
                res.status(200).json(doc);
            });
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    },
    addMessage: async (req, res) => {
        Chat.findByIdAndUpdate(req.params.id, {
            $push: {
                messages: {
                    by: req.userId,
                    message: req.body.message
                }
            }
        },
            { new: true },
        ).populate('users', 'username')
            .populate('messages.by', 'username').exec((err, doc) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                    return;
                }
                res.status(200).json(doc);
            })
    },
    getChatById: async (req, res) => {
        Chat.findById(req.params.id).populate('users', 'username')
            .populate('messages.by', 'username').exec((err, doc) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    });
                    return;
                }
                res.status(200).json(doc);
            });
    }
}