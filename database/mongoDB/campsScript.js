const faker = require('faker'); // random name generator
const fs = require('fs');

const campAnimalName = ['Owl', 'Eagle', 'Wolf', 'Fox', 'Raven', 'Bear', 'Goat'];
const campSuffixName = ['Ranch', 'Camp', 'Camping', 'Camping Site', 'Lake', 'Farm', 'Solitude', 'Getaway', 'Canyon', 'Woods'];
const campPropertySuffixName = ['Land', 'Summit', 'Ranch', 'Camp', 'Forest', 'Ridge', 'Resort', 'Sanctuary', 'Farm', 'Campground', 'Creek'];
const campState = ['California', 'Florida', 'Maine', 'Texas', 'Washington'];
const campMap = {
  California: 'https://bit.ly/3k9g2W4',

  Florida: 'https://bit.ly/3lU50ES',

  Maine: 'https://bit.ly/2HbL9Sw',

  Texas: 'https://bit.ly/2H8Z0ZR',

  Washington: 'https://bit.ly/3lOKRzK',
};
const campImageNums = {};

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



const writeRecords = fs.createWriteStream('camps.csv');
writeRecords.write('id,name,property,state,responses,rating,image,map\n', 'utf8');

function writeTenMillionRecords(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let campImageNum = Math.floor(Math.random() * 300) + 1;

      const name = randomCampName().replace(/'/g, "''"); // escape single quote with two single quotes for SQL syntax (O'Conner -> O''Conner)
      let location = `${faker.address.streetName()} ${campPropertySuffixName[Math.floor(Math.random() * campPropertySuffixName.length)]}`;
      const property = location.replace(/'/g, "''");
      const state = campState[Math.floor(Math.random() * campState.length)];
      const responses = randomCampResponses(); // responses: 0 - 2000
      const rating = randomCampRating(responses);
      const image = `https://timcamp.s3-us-west-1.amazonaws.com/camp${campImageNum}.jpg`; // images camp 1 - numImages
      const map = campMap[state];

      const data = `${id},${name},${property},${state},${responses},${rating},${image},${map}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', () => {
        console.log('draining', i, id), write();
      });
    }
  }
  write();
}

writeTenMillionRecords(writeRecords, 'utf-8', () => {
  console.log('ended')
  writeRecords.end();
});

