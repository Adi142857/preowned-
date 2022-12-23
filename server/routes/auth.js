const isAuth = require('../middlewares/isAuth');
const { login, register, refreshToken, me } = require('../controllers/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'Auth api is working' });
})

router.post('/login', login);

router.post('/register', register);

router.post('/refreshToken', refreshToken);

router.get('/me', isAuth, me);

module.exports = router;
