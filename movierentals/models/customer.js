const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    isGold: { type: Boolean, required: true },
    phone: { type: Number, requires: true }

});

const Customer = mongoose.model('Customer', customerSchema);
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required()
    };

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;