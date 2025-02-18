const express = require('express');
const connectdb = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // To use json as body parser

// Connect to MongoDB
connectdb();

app.use('/api/posts', require('./routes/posts'));

app.use('/api/users', require('./routes/users'));

app.use('/api/profiles', require('./routes/profile'));

const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* 
    1. We can create all the APIs here in server.js, but it is a good practice to create separate files for each API.
    We have created separate files for each API in the routes folder.
    For example:
    - server/routes/auth.js
    - server/routes/posts.js
    - server/routes/users.js
    - server/routes/profile.js 

    2. The first argument to the app.use() method is the base URL for the API.
    For example, if you want to create an API for posts, you would use '/api/posts' as the first argument.
    The second argument is the router object that contains the API endpoints.
    For example, if you have a route for creating a new post, you would use something like this:
    app.use('/api/posts', require('./routes/posts'));
    This will make the API endpoints available at /api/posts/create, /api/posts/get, and so on.
    The appended URL, for example: /create, is the path defined in the router object.
*/
