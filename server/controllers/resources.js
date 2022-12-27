const Resource = require('../models/resource');

const debug = require('debug')('backend:resourcesController');

module.exports = {
    getResources: async (req, res) => {
        try {
            const resources = await Resource.find(req.query);
            res.status(200).json(resources);
        } catch (error) {
            debug(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    createResource: async (req, res) => {
        try {
            req.body.user = req.userId;
            const resource = new Resource(req.body);
            const savedResource = await resource.save();
            res.status(200).json({ resource: savedResource });
        } catch (error) {
            debug(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    updateResource: async (req, res) => {
        try {
            const resource = await Resource.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, { new: true });
            res.status(200).json({ resource });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    deleteResource: async (req, res) => {
        try {
            const resource = await Resource.findByIdAndDelete(req.params.id);
            res.status(200).json({ resource });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    myResources: async (req, res) => {
        try {
            const resources = await Resource.find({ user: req.userId });
            res.status(200).json(resources);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}