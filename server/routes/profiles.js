const express = require('express');
const {auth, upload} = require('../utils');
const {check, validationResult} = require('express-validator');
const normalize = require('normalize-url');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

// POST /api/profiles - Create a new profile or update an existing one
router.post('/',
    auth,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {website, skills, linkedin, github, instagram, facebook, ...rest} = req.body;
        const profile = {
            user: req.user.id,
            website: website && website !== '' ? normalize(website, {forceHttps: true}) : '',
            skills: Array.isArray(skills)
                ? skills
                : skills.split(',').map((skill) => skill.trim()),
            ...rest
        }

        const socialFields = {linkedin, github, instagram, facebook};
        for(let key in socialFields) {
            const value = socialFields[key];
            if(value && value.length > 0) {
                socialFields[key] = normalize(value, {forceHttps: true});
            }
        }
        profile.social = socialFields;
        try {
            let profileObject = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profile},
                {new: true, upsert: true}
            )
            return res.json(profileObject);

        } catch (error) {
            console.error(error.message);
            res.status(500).send(error.message);
        }
});

// GET /api/profiles/me - Get the current user's profile
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne(
            {
                user: req.user.id
            }
        ).populate('user', ['name']);
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

/*
    1. populate() is used to reference documents in other collections.
        The first argument is the field that contains the reference.
        The second argument is an array of fields to include from the referenced document.
        The fields to include are specified by their names.
        The _id field is always included by default.
        We've used it to add a name field from the user collection to the profile object.
    2. Every communication with the database requires try-catch blocks to handle errors and 
    await for asynchronous operations.
*/

// GET /api/profiles - Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// GET /api/profiles/user/:user_id - Get profile by user ID
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne(
            {
                user: req.params.user_id
            }
        ).populate('user', ['name']);
        if (!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profile);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// DELETE /api/profiles - Delete posts, profile & user respectively
router.delete('/', auth, async (req, res) => {
    try {
        await Promise.all([
            Post.deleteMany({user: req.user.id}),
            Profile.findOneAndRemove({user: req.user.id}),
            User.findOneAndRemove({_id: req.user.id})
        ]);
        res.json({msg: 'User information successfully deleted'});
    } catch (error) {   
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// POST /api/profiles/upload - Upload profile picture
router.post('/upload', auth, async (req, res) => {
    try {
        upload(req, res, async (error) => {
            if (error) {
                return res.status(400).json({msg: err.message});
            }
            const profile = await Profile.findOne({user: req.user.id});
            profile.image = req.file.path;
            await profile.save();
            res.json(profile);
        });
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// PUT /api/profiles/experience - Add profile experience
router.put('/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, {req}) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(req.body);
            await profile.save();
            res.json(profile);
        }
        catch(error) {
            console.error(error.message);
            res.status(500).send(error.message);
        }
});

// DELETE /api/profiles/experience/:exp_id - Delete experience from profile
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({user: req.user.id});
        foundProfile.experience = foundProfile.experience.filter(
            (exp) => exp._id.toString() !== req.params.exp_id
        );
        await foundProfile.save();
        return res.status(200).json(foundProfile);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// PUT /api/profiles/education - Add profile education
router.put('/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, {req}) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(req.body);
            await profile.save();
            res.json(profile);
        }
        catch(error) {
            console.error(error.message);
            res.status(500).send(error.message);
        }
});

// DELETE /api/profiles/education/:edu_id - Delete education from profile
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({user: req.user.id});
        foundProfile.education = foundProfile.education.filter(
            (edu) => edu._id.toString() !== req.params.edu_id
        );
        await foundProfile.save();
        return res.status(200).json(foundProfile);
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;