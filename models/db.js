const mongoose = require('mongoose');

module.exports = mongoose.createConnection(
  'mongodb://localhost:27017/mth',
  { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log('Connected to mth MongoDB with Mongoose!');
  }
);
