const mongoose = require('mongoose');
const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('getting customers');
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    console.log('getting customer ', req.params.id);
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("The customer id is not available");
    res.send(customer);
});

router.post('/', async (req, res) => {
    console.log('posting customer ', req.body);
    const result = validateCustomer(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    var customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    console.log('updating customer ', req.params.id);
    console.log('customer body ', req.body);
    var customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("The customer id is not available");
    const result = validateCustomer(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    customer.name = req.body.name;
    customer.isGold = req.body.isGold;
    customer.phone = req.body.phone;
    console.log('customer body ', customer);
    customer = await customer.save();
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    console.log('deleting customer ', req.params.id);
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send("The customer id is not available");
    res.send(customer);
});

module.exports = router;