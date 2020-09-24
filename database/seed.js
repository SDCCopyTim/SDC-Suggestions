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

const createProduct = () => {
  let product = {};
  product.item = `${adjectives[Math.floor(Math.random() * Math.floor(adjectives.length))]} ${brand[Math.floor(Math.random(brand.length) * Math.floor(4))]} ${noun[Math.floor(Math.random() * Math.floor(noun.length))]}`;
  product.min_cost = parseFloat(Math.ceil(Math.random() * Math.ceil(1000)));
  product.curr_bid = parseFloat(Math.ceil(Math.random() * Math.ceil(10000)));
  product.ends_in = Math.ceil(Math.random() * Math.ceil(3));
  // the lorempixel images render very slowly for some reason.
  // don't worry too much if some images load while the others don't.
  // it's probably not your fault
  product.image = `http://lorempixel.com/400/400/technics/${Math.ceil(Math.random() * Math.ceil(10))}`;
  return product;
};

// Create 1 random Camp (IN THE SAME SCHEMA FORMAT AS CAMP SCHEMA in index.js)
// Maintaing Camp's schema format from index.js will save extra work
const createCamp = () => {
  // note that camp.id is not included; remember id will be auto_generated when you save these random-generated Camps into camps collection (mongoDB or mySQL)
  let camp = {};
  // faker.address.streetName() or faker.name.lastName() + (sometimes animal) + campName
  var useStreetName = Math.round(Math.random()); // 0 or 1
  var campFirstName = useStreetName ? faker.addres.streetName() : faker.name.lastName();
  // camp.name =
}

const createProducts = () => {
  let productsArr = [];
  for(let i = 0; i < 10; i++){
    productsArr.push(createProduct())
  }
  return productsArr
}

const insertMockData = function() {
  var seedData = createProducts(); // [{data1}, {}, ..., {}]

  // make query string
  let queryString = `INSERT INTO products (item, min_cost, curr_bid, ends_in, image) VALUES `;

  // make an array of data values to insert into
  var values = seedData.map((product, index) => {
    return(`('${product.item}', ${product.min_cost}, ${product.curr_bid}, ${product.ends_in}, '${product.image}')`);
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
var campNameArray = [];
var useStreetName = Math.round(Math.random()); // 0 or 1
var campFirstName = useStreetName ? faker.address.streetName() : faker.name.lastName();
campNameArray.push(campFirstName);

var useAnimalName = Math.round(Math.random()); // 0 or 1
var campMiddleName = useAnimalName ? campAnimalName[Math.floor(Math.random() * campAnimalName.length)] : null;
if (campFirstName.indexOf(' ') === -1 && useAnimalName) {
  campNameArray.push(campMiddleName);
}

var campSuffix = campSuffixName[Math.floor(Math.random() * campSuffixName.length)];
campNameArray.push(campSuffix);

var campName = campNameArray.join(' ');
console.log(campName);