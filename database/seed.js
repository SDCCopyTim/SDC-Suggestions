const faker = require('faker'); // random name generator
const db = require('./index.js');

// Fill in the definition of insertMockData so that when
// this file is run in the terminal with `node seed.js`,
// all 100 camps are inserted into the database

const campAnimalName = ['Owl', 'Eagle', 'Wolf', 'Fox', 'Raven', 'Bear', 'Goat'];
const campSuffixName = ['Ranch', 'Camp', 'Camping', 'Camping Site', 'Lake', 'Farm', 'Solitude', 'Getaway', 'Canyon', 'Woods'];
const campPropertySuffixName = ['Land', 'Summit', 'Ranch', 'Camp', 'Forest', 'Ridge', 'Resort', 'Sanctuary', 'Farm', 'Campground', 'Creek'];
const campState = ['California', 'Florida', 'Maine', 'Texas', 'Washington'];

// RANDOM CAMP NAME GENERATOR
const randomCampName = () => {
  // camp first name
  const campNameArray = [];
  const useStreetName = Math.round(Math.random()); // 0 or 1
  // if useStreetName is truthy, give streetName, else give a person's lastName
  const campFirstName = useStreetName ? faker.address.streetName() : faker.name.lastName();
  campNameArray.push(campFirstName);

  // camp middle name
  const useAnimalName = Math.round(Math.random()); // 0 or 1
  let campMiddleName = null;
  // if useAnimalName is falsy, give null
  if (useAnimalName) {
    campMiddleName = campAnimalName[Math.floor(Math.random() * campAnimalName.length)];
  }
  if (campFirstName.indexOf(' ') === -1 && useAnimalName) { // if the first name is a single word (e.g. not 'Del Mar') && animal name is truthy
    campNameArray.push(campMiddleName); // include that animal name as middle name
  }

  // camp suffix ('Camping', 'Canyon', 'Ranch', etc)
  const campSuffix = campSuffixName[Math.floor(Math.random() * campSuffixName.length)];
  campNameArray.push(campSuffix);

  return campNameArray.join(' ');
};

// RANDOM CAMP RESPONSES NUMBER GENERATOR
const randomCampResponses = () => {
  const r = Math.random();
  if (r < 0.65) {
    return Math.floor(Math.random() * 50) + 1; // 65% of the time: 1 - 50 responses
  }
  if (r < 0.9) {
    return Math.floor(Math.random() * 950) + 51; // 35% of the time: 51 - 1000 responses
  }
  return Math.floor(Math.random() * 1000) + 1001; // 10% of the time: 1001 - 2000 responses
};

// RANDOM CAMP RATING GENERATOR
// The greater the volume of responses is, the lower the chances are of having a full 100% rating.
const randomCampRating = (responses) => {
  let rateLevel;
  const r = Math.random();
  // When responses > 50, 100%-rating: 0%, 90-99%-rating: 85%, 80-89%-rating: 15%
  // When responses <= 50, 100%-rating: 70%, 90-99%-rating: 20%, 80-89%-rating: 10%
  if (responses > 50) {
    if (r < 0.15) {
      rateLevel = 80; // rating: 80 - 89%
    } else {
      rateLevel = 90; // rating: 90 - 99%
    }
  } else if (responses <= 50) {
    if (r < 0.1) {
      rateLevel = 80; // rating: 80 - 89%
    } else if (r < 0.3) {
      rateLevel = 90; // rating: 90 - 99%
    } else {
      return 100; // rating: 100%
    }
  }
  return Math.floor(Math.random() * 10) + rateLevel;
};

// Create 1 Random Camp
// FOR MONGOOSE: IN THE SAME SCHEMA FORMAT AS CAMP SCHEMA in index.js
// FOR MONGOOSE: Maintaing Camp's schema format from index.js will save extra work
const createCamp = (numImages) => {
  // note that camp.id will be auto_generated in data table/collection
  const camp = {};

  camp.name = randomCampName();
  camp.name = camp.name.replace(/'/g, "''"); // escape single quote with two single quotes for SQL syntax (O'Conner -> O''Conner)
  camp.property = `${faker.address.streetName()} ${campPropertySuffixName[Math.floor(Math.random() * campPropertySuffixName.length)]}`;
  camp.property = camp.property.replace(/'/g, "''");
  camp.state = campState[Math.floor(Math.random() * campState.length)];
  camp.responses = randomCampResponses(); // responses: 0 - 2000
  camp.rating = randomCampRating(camp.responses);
  camp.image_url = `https://timcamp.s3-us-west-1.amazonaws.com/camp${Math.floor(Math.random() * numImages) + 1}.jpg`; // images camp 1 - numImages

  return camp;
};

// Create Multiple Camps
const createCamps = (numCamps = 100, numImages = 300) => {
  const campsArr = [];
  for (let i = 0; i < numCamps; i += 1) {
    campsArr.push(createCamp(numImages));
  }
  return campsArr;
};

// Insert Data
const insertData = () => {
  const campsData = createCamps(100, 346);

  // make query string
  let queryString = 'INSERT INTO camps (name, property, state, responses, rating, image_url) VALUES ';

  // make an array of data values to insert into
  const values = campsData.map((camp) => (`('${camp.name}', '${camp.property}', '${camp.state}', ${camp.responses}, ${camp.rating}, '${camp.image_url}')`));

  // concat data values to query string
  queryString += `${values.join(', ')};`;
  // insert data into database
  db.query(queryString, (err) => {
    if (err) {
      console.log('Data seeding unsuccessful.', err);
    } else {
      console.log('Data seeding successful!');
    }
  });
};

insertData(); // invoke function

// let propertyName = faker.address.streetName();
// while (propertyName.indexOf('Keefe') === -1) {
//   propertyName = faker.address.streetName();
// }
// console.log(propertyName);
// propertyName = propertyName.replace(/'/g, "''");
// console.log(propertyName);
