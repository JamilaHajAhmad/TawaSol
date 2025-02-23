/*
    This file includes the route for creating a new user.
    The route is defined using the Express.js framework.
    Follow these steps to create a new user:
    1. Get the user's information from the request body.
    2. Validate the user's information.
    3. Check if the user already exists in the database.
    4. If the user does not exist, create a new user in the database.
    5. If the user already exists, return an error message.
    6. Encrypt the user's password before saving it to the database.
    7. Save the user's information to the database.
    8. Using JWT, generate a token for the user which contains the user's ID and return it to the client.

*/
const express = require('express');
const {auth} = require('../utils');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

/*
    1. post method takes 2 parameters essentially, the api url and the callback function which takes request and 
    returns response
    2. Actually, there is another type of parameters this method can take, which are called **middlewares**
    3. They're called middlewares because they come (as processing) between url and callback function
    4. Take check function as an example, it takes the attribute or the something you need to check its validity,
    and the message you want to show when this attribute isn't valid, then you call a validation function from the check
    which represents the rule of validation to apply
    5. So the check function will e processed before going to the callback function
*/

/*
    @route   POST api/users/register
    @desc    Register a new user
    @access  Public
*/
router.post('/register',
    check("name", "Please enter your name").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Your password should have at least 6 characters ").isLength({min: 6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {name,email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(user) {
                return res.status(400).json({errors: [{msg: "User already exists"}]});
            }
            user = new User({name,email,password});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {user: {id: user.id}};
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: "5 days"}, (error, token) => {
                if(error) {
                    throw error;
                }
                res.json({token});
            })
        } catch(error) {
            console.error(error.message);
            res.status(500).send(error.message);
        }
});

/*
    1. The check function is a middleware that validates the request body.
    It takes three arguments: the field to validate, the error message to display if the validation fails,
    and the validation rule to apply.
    In this case, it checks if the name field is not empty, if the email field is a valid email address,
    and if the password field has at least 6 characters.
    2. The validationResult function is used to collect all the validation errors that occurred during the request. It returns an object with an isEmpty() method that returns true if there are no errors, and an array() method that returns an array of error objects.
    3. If there are validation errors, the code returns a 400 status code and an array of error objects.
    4. If there are no validation errors, the code extracts the name, email, and password fields from the request body.
    5. The code then checks if a user with the given email already exists in the database. If a user is found, it returns a 400 status code and an error message.
    6. If no user is found, the code creates a new user object with the given name, email, and password. It then generates a salt and hashes the password using bcrypt. The salt is a random string that is used to make the hash unique, and the hash is a one-way function that converts the password into a string of characters that cannot be reversed to get the original password.
    7. findOne() is a method provided by Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js.
    It is used to find a single document that matches the specified criteria.
    In this case, it is used to find a user with the given email.
    If a user is found, it returns the user object. If no user is found, it returns null.
    It returns a promise, so you can use .then() and .catch() to handle the result and so the original function
    should be async and await should be used to handle the promise.
*/


/*
    @route POST api/users/login
    @desc Login user and get token
    @access Public
*/
router.post('/login',
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Your password should have at least 6 characters ").isLength({min: 6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }
            const payload = {user: {id: user.id}};
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: "5 days"}, (error, token) => {
                if(error) {
                    throw error;
                }
                res.json({token});
            })
        } catch(error) {
            console.error(error.message);
            res.status(500).send(error.message);
        }
});

/*
    @route GET api/users
    @desc Get user by token
    @access Private
*/ 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;