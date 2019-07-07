const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');



const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 5, maxlength: 50 },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true },
    genre: {
        type: genreSchema,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(5).max(50),
        numberInStock: Joi.number().required().min(1).max(100),
        dailyRentalRate: Joi.number().required().min(1).max(30),
        genreId: Joi.string().required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;