const Post = require('../models/postModel');
const User = require('../models/userModel');

// Opret en ny post
exports.createPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, timestamp } = req.body;

        const post = new Post({
            user_id: id,
            text,
            timestamp
        });

        await post.save();

        const user = await User.findById(id);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Like en post
exports.likePost = async (req, res) => {
    try {
        const { post_id } = req.params;

        const post = await Post.findById(post_id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.likes += 1;
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Slet en post
exports.deletePost = async (req, res) => {
    try {
        const { post_id } = req.params;

        const post = await Post.findById(post_id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
