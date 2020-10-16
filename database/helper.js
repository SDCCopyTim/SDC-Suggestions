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

  ////////////////////////////



  postOne: (body, callback) => {
    // const {itemName, quantity} = req.body
    let queryStr = `INSERT INTO camps(name, property, state, responses, rating, image_url, map_url) VALUES ("${body.name}", "${body.property}", "${body.state}", ${body.responses}, ${body.rating}, "${body.image_url}", "${body.map_url}");`
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results)
      }
    })
  },

  updateOne: (id, body, callback) => {
    let queryStr = `UPDATE camps SET name="${body.name}", property="${body.property}", state="${body.state}", responses=${parseInt(body.responses)}, rating=${parseInt(body.rating)}, image_url="${body.image_url}", map_url="${body.map_url}" WHERE id = ${id};`
    db.query(queryStr, (err) => {
      callback(err)
    })
  },


  deleteOne: (id, callback) => {
    db.query(`DELETE FROM camps WHERE id = ${id};`, (err) => {
      callback(err);
    })
  }


};

module.exports = helper;
