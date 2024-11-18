const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruter
app.use('/', userRoutes);
app.use('/', postRoutes);

//MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/facelink', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB-connection error', err));

app.get('/', (req, res) => {
    res.render('index');
})

//Run server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});