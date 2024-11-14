const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [
        {
            text: String,
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
