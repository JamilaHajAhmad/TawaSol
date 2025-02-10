const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodbConnectionString');

const connectdb = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectdb;