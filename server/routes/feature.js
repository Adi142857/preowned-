
const isAuth = require('../middlewares/isAuth');
const { getProduct, getProducts, createProduct, deleteProduct, updateProduct, myProducts } = require('../controllers/products');
const { getResources, myResources, createResource, updateResource, deleteResource } = require('../controllers/resources');

const router = require('express').Router();

router.get('/products', getProducts);
router.get('/products/me', isAuth, myProducts);
router.get('/products/:id', getProduct);
router.post('/products', isAuth, createProduct);
router.put('/products/:id', isAuth, updateProduct);
router.delete('/products/:id', isAuth, deleteProduct);

router.get('/resources', getResources);
router.get('/resources/me', isAuth, myResources);
router.post('/resources', isAuth, createResource);
router.put('/resources/:id', isAuth, updateResource);
router.delete('/resources/:id', isAuth, deleteResource);

module.exports = router;