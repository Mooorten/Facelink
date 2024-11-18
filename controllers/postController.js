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

        res.redirect('/posts'); // Redirect til forsiden
    } catch (err) {
        console.error(err);
        res.status(500).send('Kunne ikke oprette posten');
    }
};

// Hent alle posts og sorter efter likes
exports.getAllPosts = async (req, res) => {
    try {
        // Find alle posts og populér user_id, og sortér efter likes (faldende rækkefølge)
        const posts = await Post.find().populate('user_id').sort({ likes: -1 });
        res.render('posts', { posts }); // Render posts view med alle posts
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved hentning af posts');
    }
};

// Like et post
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id; // Hent postens ID fra URL'en

        // Find posten og opdater likes
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post ikke fundet');
        }

        // Øg antallet af likes
        post.likes += 1;
        await post.save(); // Gem ændringerne

        res.redirect('/posts'); // Redirect tilbage til listen af posts
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved like af posten');
    }

    // controllers/postController.js
    exports.deletePost = async (req, res) => {
        try {
            const postId = req.params.id; // Hent postens ID fra URL'en

            // Find posten og fjern den fra brugerens posts array
            const post = await Post.findById(postId);
            const userId = post.user_id;

            // Fjern posten fra brugerens posts array
            await User.findByIdAndUpdate(userId, {
                $pull: { posts: postId }
            });

            // Slet posten fra databasen
            await Post.findByIdAndDelete(postId);

            res.redirect('/posts'); // Redirect tilbage til posts-siden
        } catch (err) {
            console.error(err);
            res.status(500).send('Kunne ikke slette posten');
        }
    };


};
