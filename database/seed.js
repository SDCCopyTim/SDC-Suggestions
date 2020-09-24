const db = require('./index.js');
const faker = require('faker'); // random name generator

// Fill in the definition of insertMockData so that when
// this file is run in the terminal with `node seed.js`,
// all 100 products are inserted into the database

// const adjectives = ['Used', 'New', 'Refurbished', "PARTS ONLY"];
// const brand = ['Sonny', 'Ninetendo', 'Microhard', 'Azeus', 'Sansong', 'Apull', 'Wowhey', 'Illogitech'];
// const noun = ['Smartphone', 'Monitor', 'Headphones', 'Earbuds', 'Trashcan', 'Laptop', 'Gaming System', 'TV', 'Personal Air Conditioning Unit', 'Gaming Mouse', 'Tablet', 'Flip Phone', 'Pager'];
const campAnimalName = ['Owl', 'Eagle', 'Wolf', 'Fox', 'Raven', 'Bear', 'Goat']
const campSuffixName = ['Ranch', 'Camp', 'Camping Site', 'Lake', 'Farm', 'Solitude', 'Getaway', 'Canyon', 'Woods']
const imageUrl = ['url1', 'url2', 'url3', 'url4', 'url5'];

const randomCampName = () => {
  // camp first name
  var useStreetName = Math.round(Math.random()); // 0 or 1
  var campFirstName = useStreetName ? faker.address.streetName() : faker.name.lastName();

  var campNameArray = [];
  var useStreetName = Math.round(Math.random()); // 0 or 1
  var campFirstName = useStreetName ? faker.address.streetName() : faker.name.lastName();
  campNameArray.push(campFirstName);

  // camp middle name
  var useAnimalName = Math.round(Math.random()); // 0 or 1
  var campMiddleName = useAnimalName ? campAnimalName[Math.floor(Math.random() * campAnimalName.length)] : null;
  if (campFirstName.indexOf(' ') === -1 && useAnimalName) {
    campNameArray.push(campMiddleName);
  }

  // camp suffix ('Camping', 'Canyon', 'Ranch', etc)
  var campSuffix = campSuffixName[Math.floor(Math.random() * campSuffixName.length)];
  campNameArray.push(campSuffix);

  return campNameArray.join(' ');
}

// Create 1 random Camp (IN THE SAME SCHEMA FORMAT AS CAMP SCHEMA in index.js)
// Maintaing Camp's schema format from index.js will save extra work
const createCamp = () => {
  // note that camp.id is not included; remember id will be auto_generated when you save these random-generated Camps into camps collection (mongoDB or mySQL)
  let camp = {};
  camp.name = randomCampName();
  camp.image_url = `https://timcamp.s3-us-west-1.amazonaws.com/camp${Math.ceil(Math.random() * 346)}.png`
}

const createCamps = () => {
  let campsArr = [];
  for (let i = 0; i < 10; i++) {
    campsArr.push(createCamp());
  }
  return campsArr;
}

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

console.log(randomCampName());