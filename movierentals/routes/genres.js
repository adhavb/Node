const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Genre, validateGenres } = require('../models/genre');



router.get('/', async (req, res) => {
    console.log('getting genres');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre id is not available");

    res.send(genre);
});

router.post('/', async (req, res) => {

    const result = validateGenres(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    var genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    console.log('putting genres ', req.params.id);
    console.log('genre body ', req.body);
    var genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre id is not available");

    const result = validateGenres(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    console.log('genre body ', genre);
    genre = await genre.save();
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    console.log('deleting genres ', req.params.id);
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send("The genre id is not available");

    res.send(genre);
});



module.exports = router;