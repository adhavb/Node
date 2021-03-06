const mongoose = require('mongoose');
const Joi = require('joi');



function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    email: { type: String, required: true, minlength: 5, maxlength: 255, unique: true },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 }
    //joi-password-complexity is a utility to set the requirements for the password
}));

module.exports.validateUser = validateUser;
module.exports.User = User;
