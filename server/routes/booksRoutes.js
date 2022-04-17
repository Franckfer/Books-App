const { Router } = require("express");
const router = Router(); 
const { getBooks, addBook, deleteBook } = require("../controllers/bookController");

router
    .get('/', getBooks )
    .post('/', addBook)
    .delete('/:id', deleteBook)





module.exports = router;