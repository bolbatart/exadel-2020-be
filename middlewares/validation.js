const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const User = mongoose.model('users');


const registration = async (req, res, next) => {
    const schema = {
        firstname: Joi.string().min(2).max(255).required(),
        lastname: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
        phonenumber: Joi.string().allow(''),
        country: Joi.string().allow(''),
        description: Joi.string().allow(''),
        image: Joi.string().allow('')
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
        const input = error.details[0].message.split('\" ')[0].split('\"')[1]
        const inputErr = error.details[0].message.split('\" ')[1]
        switch (input) {
            case 'firstname':
                return res.status(400).send({ message: 'Firstname ' + inputErr });
            case 'lastname':
                return res.status(400).send({ message: 'Last name ' + inputErr });
            case 'email':
                return res.status(400).send({ message: 'Email ' + inputErr });
            case 'password':
                return res.status(400).send({ message: 'Password ' + inputErr });
            case 'phonenumber':
                return res.status(400).send({ message: 'Phone number ' + inputErr });
            case 'country':
                return res.status(400).send({ message: 'Country ' + inputErr });
            case 'description':
                return res.status(400).send({ message: 'Introduction ' + inputErr });                    
            default:
                return res.status(400).send({ message: 'something went wrong...'})
                break;
        }
    } else {
        let user = await User.findOne({ email: req.body.email});
        if (user) return res.status(400).send({ message: "User already registered" }); 
        else return next();
    }
        
};

const login = async (req, res, next) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        return next();
    }
};

const validateNewProject = async (req, res, next) => {
    const schema = {
        projectName: Joi.string().min(2).max(255).required(),
        projectLocation: Joi.string().min(2).max(255).required(),
        professionalsNeeded: Joi.array().items(Joi.string()).unique(),
        projectArea: Joi.string().min(2).required(),
        projectShortDescription: Joi.string().min(2).max(150).required(),
        projectDescription: Joi.string().min(2).max(400).required(),   
        userId: req.body.userId
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        return next();
    }
        
};

module.exports = {
    registration,
    login,
    validateNewProject
};