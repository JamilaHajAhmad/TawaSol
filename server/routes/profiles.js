const express = require('express');
const {auth} = require('../utils');
const {check, validationResult} = require('express-validator');
const normalize = require('normalize-url');
const router = express.Router();
const Profile = require('../models/Profile');

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
    populate() is used to reference documents in other collections.
    The first argument is the field that contains the reference.
    The second argument is an array of fields to include from the referenced document.
    The fields to include are specified by their names.
    The _id field is always included by default.
*/

module.exports = router;