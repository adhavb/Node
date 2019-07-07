const mongoose = require('mongoose');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental, validateRental } = require('../models/rental');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find();
    res.send(rental);
});

router.get('/:id', async (req, res) => {
    console.log('Getting rental for id ', req.params.id);
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("The rental id is not available");
    res.send(rental);
});

router.put('/:id', (req, res) => {

});

router.post('/', async (req, res) => {
    console.log('posting rental ', req.body);
    const result = validateRental(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("The movie id is not available");
    if (movie.numberInStock == 0) return res.send(400).send("The requested movie is not in stock");
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("The customer id is not available");
    var rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }

    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            }).run();
        res.send(rental);
    }
    catch (ex) {
        res.status(500).send('Something went wrong at the server');
    }
});


router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    res.send(rental);
});




module.exports = router;