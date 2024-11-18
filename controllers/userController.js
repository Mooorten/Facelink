const User = require('../models/userModel'); // User model

// Hent alle brugere
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Hent alle brugere fra databasen
        res.render('index', { users }); // Render index view med brugere
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved hentning af brugere');
    }
};

// Opret en ny bruger
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body; // Hent data fra formularen

        const newUser = new User({
            name,
            email,
            posts: [] // Start med en tom posts-array
        });

        await newUser.save(); // Gem brugeren i databasen

        res.redirect('/'); // Redirect til forsiden
    } catch (err) {
        console.error(err);
        res.status(500).send('Kunne ikke oprette brugeren');
    }
};
