const User = require('../models/userModel');
const Post = require('../models/postModel');

// Opret en ny bruger
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Hent en brugers posts
exports.getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('posts');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Find brugeren med flest posts
exports.userWithMostPosts = async (req, res) => {
    try {
        const result = await Post.aggregate([
            { $group: { _id: '$user_id', totalPosts: { $sum: 1 } } },
            { $sort: { totalPosts: -1 } },
            { $limit: 1 }
        ]);

        if (!result.length) {
            return res.status(404).json({ error: 'No users found' });
        }

        const user = await User.findById(result[0]._id);

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            totalPosts: result[0].totalPosts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
