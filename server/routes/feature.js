
const isAuth = require('../middlewares/isAuth');
const { getBook, getBooks, createBook, deleteBook, updateBook, myBooks } = require('../controllers/books');
const { getResources, myResources, createResource, updateResource, deleteResource } = require('../controllers/resources');

const router = require('express').Router();

router.get('/books', getBooks);
router.get('/books/me', isAuth, myBooks);
router.get('/books/:id', getBook);
router.post('/books', isAuth, createBook);
router.put('/books/:id', isAuth, updateBook);
router.delete('/books/:id', isAuth, deleteBook);

router.get('/resources', getResources);
router.get('/resources/me', isAuth, myResources);
router.post('/resources', isAuth, createResource);
router.put('/resources/:id', isAuth, updateResource);
router.delete('/resources/:id', isAuth, deleteResource);

module.exports = router;