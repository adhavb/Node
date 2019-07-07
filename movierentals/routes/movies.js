const mongoose = require('mongoose');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('getting movies');
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    console.log('getting movie ', req.params.id);
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("The movie id is not available");
    res.send(movie);
});

router.post('/', async (req, res) => {
    console.log('posting movie ', req.body);
    const result = validateMovie(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    var movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: { _id: genre._id, name: genre.name }
    });
    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    console.log('updating movie ', req.params.id);
    console.log('movie body ', req.body);
    var movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("The movie id is not available");
    const result = validateMovie(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    movie.name = req.body.name;
    movie.isGold = req.body.isGold;
    movie.phone = req.body.phone;
    console.log('movie body ', movie);
    movie = await Movie.updateOne(movie);
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    console.log('deleting movie ', req.params.id);
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send("The movie id is not available");
    res.send(movie);
});

module.exports = router;