const faker = require('faker');
const db = require('./index.js');


const helper = {

  getOne: (callback) => {
    const randomId = faker.random.number({
      min: 1,
      max: 100,
    });
    const queryString = `SELECT * FROM camps WHERE id=${randomId};`;

    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
};


module.exports = helper;