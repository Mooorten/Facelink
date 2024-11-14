const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Standard til port 3000, hvis ikke sat i .env
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Middleware til at håndtere JSON-data
app.use(express.json());

// Definer ruterne
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Forbind til MongoDB
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 10000 })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Sæt EJS som templating engine
app.set('view engine', 'ejs');

// 404 fejl håndtering
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
