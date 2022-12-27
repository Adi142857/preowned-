const router = require('express').Router();
const auth = require('./auth')
const feature = require('./feature')

router.use('/auth', auth);
router.use('/', feature)

module.exports = router;