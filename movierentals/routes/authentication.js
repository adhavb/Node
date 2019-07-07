const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {

    const result = validateUser(req.body);
    console.log('User Validation result ', result);

    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return res.status(200).send(token);

    /*res.send({
        Lodash.pick(user, ['name', 'email'])
    });*/
});

function validateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}




module.exports = router;