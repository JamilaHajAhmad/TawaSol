const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const { check, validationResult } = require('express-validator');
const auth = require('../utils');
const router = express.Router();


// POST /api/posts - Create a new post
router.post('/',
    auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                user: req.user.id
            });
            const post = await newPost.save();
            res.json(post);
        } catch (error) {
            console.error(error.message);
            res.status(500).send(error.message);
        }
});

// GET /api/posts - Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // Sort by most recent first (DESC by date)
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// GET /api/posts/:id - Get post by id
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// PUT /api/posts/like/:id - Like a post
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked by this user
        if (post.likes.filter(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        // OR: use the built-in function some() to check if the user has already liked the post
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// PUT /api/posts/unlike/:id - Unlike a post
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked by this user
        if(!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);
        await post.save();
        res.json(post.likes);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;