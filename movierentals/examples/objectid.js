const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

console.log('Id ', id);
console.log('Timestamp ', id.getTimestamp());
