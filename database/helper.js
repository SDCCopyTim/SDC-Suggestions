const faker = require('faker');
const db = require('./index.js');

const helper = {
  // get 1 random camp
  getOne: (callback) => {
    const randomId = faker.random.number({
      min: 1,
      max: 100,
    });
    const queryString = `SELECT * FROM camps WHERE id=${randomId};`;

    // invoke query
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  // get random 12 camps
  getTwelve: (callback) => {
    // generate 12 random unique camp id numbers
    const randomIds = [];
    let count = 12;
    while (count > 0) {
      // generate random id number 1-100
      const randomId = faker.random.number({
        min: 1,
        max: 100,
      });
      // if id is unique
      if (randomIds.indexOf(randomId) === -1) {
        // add to randomIds
        randomIds.push(randomId);
        count -= 1;
      }
    }

    // convert to MySQL command
    const queryString = `SELECT * FROM camps WHERE id IN (${randomIds.join(', ')});`;

    // invoke query
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  // get random 6 camps
  // getLists: (callback) => {

  // },

};

module.exports = helper;
