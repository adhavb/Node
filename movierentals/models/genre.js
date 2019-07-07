const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 }
});

function validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const Genre = mongoose.model('Genre', genreSchema);

module.exports.validateGenres = validateGenres;
module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;