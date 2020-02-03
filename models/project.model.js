const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    
    projectName: {
        type: String,
    },
    photo: {
        type: String
    },
    projectLocation: {
        type: String,
    },
    professionalsNeeded: {
        type: Array
    },
    projectArea: {
        type: String,
    },
    projectShortDescription: {
        type: String,
    },
    projectDescription: {
        type: String
    },
    lastUpdate: {
        type: String
    },
    timeInserted: {
        type: String
    },
    userId: {
        type: String
    }
});

mongoose.model('projects', projectSchema);