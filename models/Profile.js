// models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    githubusername: {
        type: String
    },
    social: {
        youtube: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        instagram: { type: String }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', ProfileSchema);
