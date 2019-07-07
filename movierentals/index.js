const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const authentication = require('./routes/authentication');
const express = require('express');
const config = require('config');

const app = express();
console.log('JSON Environment Variable ', config.get('jwtPrivateKey'));
if (!config.get('jwtPrivateKey')) {
    console.log('JSON Environment Variable ', config.get('jwtPrivateKey'));
    console.error('JWT Environment variable not set');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Could not connect to MongoDB ', err))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', authentication);

const port = process.env.port || 2001;
app.listen(port, () => console.log(`Listening to Port ${port}`));