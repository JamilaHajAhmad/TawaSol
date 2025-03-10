const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    country: {
        type: String
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {   
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {   
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        linkedin: {
            type: String
        },
        github: {
            type: String
        },
        instagram: {
            type: String
        },
        facebook: {
            type: String
        }
    }
});

module.exports = mongoose.model('Profile', profileSchema);