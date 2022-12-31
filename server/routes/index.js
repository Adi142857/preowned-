const router = require('express').Router();
const auth = require('./auth')
const feature = require('./feature')

router.use('/auth', auth);
router.use('/', feature)
router.get('/', (req, res) => {
    res.json({ message: 'Api is working' });
})

module.exports = router;