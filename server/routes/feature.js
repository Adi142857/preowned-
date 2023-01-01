
const isAuth = require('../middlewares/isAuth');
const { getProduct, getProducts, createProduct, deleteProduct, updateProduct, myProducts, getChatByProduct, addMessage, getOrCreateChat, getChatById } = require('../controllers/products');
const { getRequirements, myRequirements, createRequirement, updateRequirement, deleteRequirement } = require('../controllers/requirements');

const router = require('express').Router();

router.get('/products', getProducts);
router.get('/products/me', isAuth, myProducts);
router.get('/products/:id', getProduct);
router.post('/products', isAuth, createProduct);
router.put('/products/:id', isAuth, updateProduct);
router.delete('/products/:id', isAuth, deleteProduct);

router.post('/chat/getOrCreateChat', isAuth, getOrCreateChat);
router.get('/chat/product/:id', isAuth, getChatByProduct);
router.get('/chat/:id', isAuth, getChatById);
router.post('/chat/:id', isAuth, addMessage);

router.get('/requirements', getRequirements);
router.get('/requirements/me', isAuth, myRequirements);
router.post('/requirements', isAuth, createRequirement);
router.put('/requirements/:id', isAuth, updateRequirement);
router.delete('/requirements/:id', isAuth, deleteRequirement);

module.exports = router;