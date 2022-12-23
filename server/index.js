require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes');
const debug = require('debug')('backend:main');

const app = express();

// connect to mongodb
mongoose.connect("mongodb+srv://aditya:prathamesh@cluster0.fwpb7vk.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    debug('Connected to MongoDB');
}).catch((err) => {
    debug(err);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
}));


// routes
app.use('/api', router)

// 404 route
app.use((req, res, next) => {
    const err = new Error('The requested api endpoint does not exist');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

// Server Initialization
const port = process.env.PORT || 5000;
app.listen(port, () => {
    debug(`Server started on port ${port}`);
});