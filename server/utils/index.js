const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid, authorization denied' });
            }
            req.user = decoded.user;
            next();
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = {auth};


/*
    1. When you define a custom middleware function like `auth`, you should call `next()` to pass
    control to the next middleware function or route handler which will process the request.
    This is crucial for the middleware to work correctly in the Express.js request-response cycle.
    If you don't call `next()`, the request will be left hanging and no further processing will occur.

    2. select('-password') is used to exclude the password field from the user object that is returned.
    This is a common practice to ensure that sensitive information is not exposed in the response.
*/