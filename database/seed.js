const db = require('./index.js');
const faker = require('faker'); // random name generator

// Fill in the definition of insertMockData so that when
// this file is run in the terminal with `node seed.js`,
// all 100 camps are inserted into the database

const campAnimalName = ['Owl', 'Eagle', 'Wolf', 'Fox', 'Raven', 'Bear', 'Goat'];
const campSuffixName = ['Ranch', 'Camp', 'Camping', 'Camping Site', 'Lake', 'Farm', 'Solitude', 'Getaway', 'Canyon', 'Woods'];
const campPropertySuffixName = ['Land', 'Summit', 'Ranch', 'Camp', 'Forest', 'Ridge', 'Resort', 'Sanctuary', 'Farm', 'Campground', 'Creek'];
const campState = ['California', 'Florida', 'Maine', 'Texas', 'Washington'];

// RANDOM CAMP NAME GENERATOR ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const randomCampName = () => {
  // camp first name
  var campNameArray = [];
  var useStreetName = Math.round(Math.random()); // 0 or 1
  var campFirstName = useStreetName ? faker.address.streetName() : faker.name.lastName(); // if useStreetName is truthy, give streetName, else give a person's lastName
  campNameArray.push(campFirstName);

  // camp middle name
  var useAnimalName = Math.round(Math.random()); // 0 or 1
  var campMiddleName = useAnimalName ? campAnimalName[Math.floor(Math.random() * campAnimalName.length)] : null; // if useAnimalName is falsy, give null
  if (campFirstName.indexOf(' ') === -1 && useAnimalName) { // if the first name is not two words (e.g. 'Del Mar') && animal name is truthy
    campNameArray.push(campMiddleName); // include that animal name as middle name
  }

  // camp suffix ('Camping', 'Canyon', 'Ranch', etc)
  var campSuffix = campSuffixName[Math.floor(Math.random() * campSuffixName.length)];
  campNameArray.push(campSuffix);

  return campNameArray.join(' ');
};

// RANDOM CAMP RATING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This function is used to deliver a realistic rating trend on Hipcamp depending on the amount of responses.
// The greater the volume of responses is, the lower the chances are of having a full 100% rating.
const randomCampRating = (responses) => {
  var rateLevel;
  var r = Math.random();
  // When responses > 50, 100%-rating: 0%, 90-99%-rating: 85%, 80-89%-rating: 15%
  if (responses > 50) {
    if (r < 0.15) {
      rateLevel = 80; // rating: 80 - 89%
    } else {
      rateLevel = 90; // rating: 90 - 99%
    }
  }
  // When responses <= 50, 100%-rating: 70%, 90-99%-rating: 20%, 80-89%-rating: 10%
  else {
    if (r < 0.1) {
      rateLevel = 80; // rating: 80 - 89%
    } else if (r < 0.3) {
      rateLevel = 90; // rating: 90 - 99%
    } else {
      return 100; // rating: 100%
    }
  }
  return Math.floor(Math.random() * 10) + rateLevel; // (0 - 0.9) * 10 + (80 or 90) --> 80-89 or 90-99
}

// Create 1 random Camp (IN THE SAME SCHEMA FORMAT AS CAMP SCHEMA in index.js)
// Maintaing Camp's schema format from index.js will save extra work
const createCamp = (maxResponses, numImages) => {
  // note that camp.id is not included; remember id will be auto_generated when you save these random-generated Camps into camps collection (mongoDB or mySQL)
  let camp = {};
  camp.name = randomCampName();
  camp.property = faker.address.streetName() + ' ' + campPropertySuffixName[Math.floor(Math.random() * campPropertySuffixName.length)]; // '(streetName) Ranch'
  camp.state = campState[Math.floor(Math.random() * campState.length)];
  camp.responses = Math.floor(Math.random() * (maxResponses + 1)); // responses: 0 - maxResponses
  camp.rating = Math.floor(Math.random() * (100 + 1));
  camp.image_url = `https://timcamp.s3-us-west-1.amazonaws.com/camp${Math.floor(Math.random() * numImages) + 1}.png`; // images camp 1 - numImages

  console.log(camp);
  return camp;
};
//createCamp(2000, 346);

const createCamps = () => {
  let campsArr = [];
  for (let i = 0; i < 10; i++) {
    campsArr.push(createCamp(2000, 346));
  }
  return campsArr;
};

const insertMockData = function () {
  var seedData = createProducts(); // [{data1}, {}, ..., {}]

  // make query string
  let queryString = `INSERT INTO products (item, min_cost, curr_bid, ends_in, image) VALUES `;

  // make an array of data values to insert into
  var values = seedData.map((product, index) => {
    return (`('${product.item}', ${product.min_cost}, ${product.curr_bid}, ${product.ends_in}, '${product.image}')`);
  });

  // concat data values to query string
  queryString += values.join(', ') + ';';

  // insert data into database
  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Data seeding unsuccessful.');
    } else {
      console.log('Data seeding successful!');
    }
  });
};

// insertMockData(); // invoke function