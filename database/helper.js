const faker = require('faker');
const db = require('./index.js');

const helper = {
  // get random 9 camps
  getNine: (callback) => {
    // generate 9 random unique camp id numbers
    const randomIds = [];
    let count = 9;
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

};

module.exports = helper;
