const Book = require("../models/Book")
const fs = require('fs-extra');
const path = require('path');


module.exports = {

    getBooks: async (req, res) => {

        const book = await Book.find();

        return res.json(book)
    },
    addBook: async (req, res) => {

        const { title, author, isbn } = req.body;
        const imagePath = '/uploads/' + req.file.filename;

        const newBook = new Book({ title, author, isbn, imagePath });
        console.log(newBook);

        await newBook.save();

        return res.json({
            msg: 'Book Saved'
        });
    },
    deleteBook: async (req, res) => {
        
        const book = await Book.findByIdAndDelete(req.params.id);

        fs.unlink(path.resolve(`./server/public${book.imagePath}`));
        // eliminamos la imagen del libro

        return res.json({
            msg: 'Book Deleted'
        });
    }

}
    

