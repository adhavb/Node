const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    checkOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    checkIn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        required: true
    }
});

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    return Joi.validate(rental, schema);
}

const Rental = mongoose.model('Rental', rentalSchema);

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
module.exports.validateRental = validateRental;
