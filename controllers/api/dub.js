const express = require('express');
const router = express.Router();

// Import the necessary models
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

// Define the homepage route
router.get('/', async (req, res) => {
    try {
        // Get the current user's data
        const currentUser = await User.findById(req.user._id);

        // Get the current user's post data with comments
        const posts = await Post.find({ author: req.user._id }).populate('author').populate('comments');

        // Render the homepage template with the user's post data and user data
        res.render('homepage', { currentUser, posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
