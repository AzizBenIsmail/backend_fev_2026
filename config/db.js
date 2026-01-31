const mongoose = require('mongoose');

module.exports.connectToMondoDB = async () => {
  mongoose.connect(process.env.Url_MongoDB).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
};