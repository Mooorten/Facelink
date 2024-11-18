const Post = require('../models/postModel');
const User = require('../models/userModel');


//Show create new post form
exports.getNewPostForm = async (req, res) => {
    try {
        const users = await User.find();
        res.render('newPost', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved visning af formular for post');
    }
};

//Create new post
exports.createPost = async (req, res) => {
    try {
        const { user_id, text } = req.body;

        // Opret en ny post
        const newPost = new Post({
            user_id,
            text,
            timestamp: new Date(),
            likes: 0
        });

        await newPost.save();

        await User.findByIdAndUpdate(user_id, {
            $push: { posts: newPost._id }
        });

        res.redirect('/posts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Kunne ikke oprette posten');
    }
};

//Get all posts and sort
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_id').sort({ likes: -1 });
        res.render('posts', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved hentning af posts');
    }
};

//Give a like
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post ikke fundet');
        }

        post.likes += 1;
        await post.save();

        res.redirect('/posts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Fejl ved like af posten');
    }

    exports.deletePost = async (req, res) => {
        try {
            const postId = req.params.id;

            const post = await Post.findById(postId);
            const userId = post.user_id;

            await User.findByIdAndUpdate(userId, {
                $pull: { posts: postId }
            });

            await Post.findByIdAndDelete(postId);

            res.redirect('/posts');
        } catch (err) {
            console.error(err);
            res.status(500).send('Kunne ikke slette posten');
        }
    };
};