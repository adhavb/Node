const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const Lodash = require('lodash');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');

router.post('/', async (req, res) => {
    console.log('Posting User ', req.body);

    const result = validateUser(req.body);
    console.log('User Validation result ', result);

    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send('User already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    user = await user.save();
    res.header('x-auth-token', token).send({
        name: user.name,
        email: user.email
    });

    /*res.send({
        Lodash.pick(user, ['name', 'email'])
    });*/
});





module.exports = router;