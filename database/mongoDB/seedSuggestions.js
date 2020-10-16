const db = require('./index.js');
const faker = require('faker');


const createCamp = () => {
  const camp = {};

  camp.name = faker.lorem.word();
  camp.property = faker.address.city();
  camp.state = faker.address.state();
  camp.responses = faker.random.number();
  camp.rating = faker.random.number();
  camp.image = faker.random.image();
  camp.map = faker.random.image()

  return camp;
};

const createCamps = () => {
  const campsArr = [];

  for (let i = 0; i < 100; i++) {
    campsArr.push(createCamp());
  }

  db.Suggestions.insertMany(campsArr, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('seeded successfully!!!!');
    }
  });
};

createCamps();