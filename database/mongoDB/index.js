const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timcampDB', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to timcamp BABYY!!')
});

const suggestionsSchema = new mongoose.Schema({
  name: String,
  property: String,
  state: String,
  responses: Number,
  rating: Number,
  image: String,
  map: String
});

const Camps = mongoose.model('Camps', suggestionsSchema);

module.exports = {
  Camps,
  db
};

