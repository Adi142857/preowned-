const Requirement = require('../models/requirement');

const debug = require('debug')('backend:requirementsController');

module.exports = {
    getRequirements: async (req, res) => {
        try {
            const requirements = await Requirement.find(req.query);
            res.status(200).json(requirements);
        } catch (error) {
            debug(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    createRequirement: async (req, res) => {
        try {
            req.body.user = req.userId;
            const requirement = new Requirement(req.body);
            const savedRequirement = await requirement.save();
            res.status(200).json({ requirement: savedRequirement });
        } catch (error) {
            debug(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    updateRequirement: async (req, res) => {
        try {
            const requirement = await Requirement.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, { new: true });
            res.status(200).json({ requirement });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    deleteRequirement: async (req, res) => {
        try {
            const requirement = await Requirement.findByIdAndDelete(req.params.id);
            res.status(200).json({ requirement });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    myRequirements: async (req, res) => {
        try {
            const requirements = await Requirement.find({ user: req.userId });
            res.status(200).json(requirements);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}