// controllers/postController.js
const Post = require('../models/postModel'); // Post model
const User = require('../models/userModel'); // User model

// Vis formularen for at oprette en ny post
exports.getNewPostForm = async (req, res) => {
    try {
        const users = await User.find(); // Hent alle brugere fra databasen
        res.render('newPost', { users }); // Render formularen for at oprette et post
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved visning af formular for post');
    }
};

// Opret en ny post
exports.createPost = async (req, res) => {
    try {
        const { user_id, text } = req.body; // Hent data fra formularen

        // Opret en ny post
        const newPost = new Post({
            user_id,
            text,
            timestamp: new Date(),
            likes: 0
        });

        await newPost.save(); // Gem posten i databasen

        // Tilføj posten til brugerens posts
        await User.findByIdAndUpdate(user_id, {
            $push: { posts: newPost._id }
        });

        res.redirect('/'); // Redirect til forsiden
    } catch (err) {
        console.error(err);
        res.status(500).send('Kunne ikke oprette posten');
    }
};

// Hent alle posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_id'); // Find alle posts og populér user_id (for at vise brugerens info)
        res.render('posts', { posts }); // Render posts view med alle posts
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved hentning af posts');
    }
};
