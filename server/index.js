process.env.NODE_ENV !== 'production' ? require('dotenv').config() : ''
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require('cors');



// Initializations
const app = express();
require('./database')

// Settings
app.set('port',process.env.PORT || 3500);


// Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        const name = new Date().getTime();
        cb(null, `${name}${path.extname(file.originalname)}`)
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); // interpreta datos del formulario en formato JSON
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/books', require('./routes/booksRoutes'))


// Static files 
app.use(express.static(path.join(__dirname, 'public/')))


// Start the server
app.listen(app.get('port'), () => {
    console.log('Server running in the port', app.get('port'))
});