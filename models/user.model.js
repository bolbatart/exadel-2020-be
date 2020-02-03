const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phonenumber: {
        type: String
    },
    country: {
        type: String,
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    userProjects: {
        type: Array
    }
});

mongoose.model('users', userSchema);