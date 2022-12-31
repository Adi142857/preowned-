const Product = require('../models/product')
const debug = require('debug')('backend:bookController')
const Chat = require('../models/chat');

module.exports = {
    getProducts: async (req, res) => {
        Product.find((err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    getProduct: async (req, res) => {
        Product.findById(req.params.id, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    createProduct: async (req, res) => {
        const product = new Product({
            ...req.body,
            user: req.userId
        });
        product.save((err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    updateProduct: async (req, res) => {
        Product.findByIdAndUpdate(req.params.id, {
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
    deleteProduct: async (req, res) => {
        Product.findByIdAndDelete(req.params.id, (err, doc) => {
            if (!doc) {
                res.status(404).json({
                    message: 'Product not found'
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
                message: 'Product deleted successfully'
            });
        });
    },
    myProducts: async (req, res) => {
        Product.find({ user: req.userId }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json(doc);
        });
    },
    getChatByProduct: async (req, res) => {
        Chat.find({
            productId: req.params.id,
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
        const product = await Product.findById(req.body.productId);
        if (!product) {
            res.status(404).json({
                message: 'Product not found'
            });
            return;
        }

        const existingChat = await Chat.findOne({
            productId: req.body.productId,
            users: req.userId
        }).populate('users', 'username')
            .populate('messages.by', 'username');

        if (existingChat) {
            res.status(200).json(existingChat);
            return;
        }

        const chat = new Chat({
            productId: req.body.productId,
            users: [
                req.userId,
                product.user
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