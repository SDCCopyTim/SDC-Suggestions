// MySQL Database
const mysql = require('mysql');
// const PASSWORD = require('./password.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timcampDB',
});

connection.connect();

module.exports = connection;

// BELOW IS A MONGOOSE VERSION OF THE DATABASE

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');

// formated to filter out desired properties
// const imageSchema = mongoose.Schema({
//   id: Number,
//   img_url: String
// })

// const campSchema = mongoose.Schema({
//   id: Number,
//   name: String,
//   property: String,
//   state: String,
//   rating: Number,
//   responses: Number,
//   image_url: String
// });



// connection: the collections are "images, camps, lists"
// const Image = mongoose.model('Image', imageSchema);
// const Camp = mongoose.model('Camp', campSchema);
// const List = mongoose.model('List', listSchema);

// module.exports = { Image, Camp, List };
