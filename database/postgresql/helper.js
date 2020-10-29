const faker = require('faker');
const db = require('./index.js');


const helper = {

  one: (id, callback) => {
    const randomId = faker.random.number({
      min: 1,
      max: 10000000,
    });
    const queryString = `SELECT * FROM camp WHERE id=${id};`;

    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows[0]);
      }
    });
  }
};

module.exports = helper;