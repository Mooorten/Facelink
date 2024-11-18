const User = require('../models/userModel');

//Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved hentning af brugere');
    }
};

//Create new user
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const newUser = new User({
            name,
            email,
            posts: []
        });

        await newUser.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Kunne ikke oprette brugeren');
    }
};