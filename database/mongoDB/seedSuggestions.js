const db = require('./index.js');
const faker = require('faker');


const campAnimalName = ['Owl', 'Eagle', 'Wolf', 'Fox', 'Raven', 'Bear', 'Goat'];
const campSuffixName = ['Ranch', 'Camp', 'Camping', 'Camping Site', 'Lake', 'Farm', 'Solitude', 'Getaway', 'Canyon', 'Woods'];
const campPropertySuffixName = ['Land', 'Summit', 'Ranch', 'Camp', 'Forest', 'Ridge', 'Resort', 'Sanctuary', 'Farm', 'Campground', 'Creek'];
const campState = ['California', 'Florida', 'Maine', 'Texas', 'Washington'];
const campMap = {
  California: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26437.75777640662!2d-116.54228946132449!3d34.076698423888004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db253a8e4edd49%3A0xaa1bb38ea32f703c!2sThe%20Desert%20Rose%20Collective!5e0!3m2!1sen!2sus!4v1601597006195!5m2!1sen!2sus',

  Florida: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55094.86466806726!2d-83.32368242044049!3d30.338754311563658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88eebfcd86d5598d%3A0x15778544bb77d6b3!2sHome%20Field%20Advantage%20Farmstead!5e0!3m2!1sen!2sus!4v1601597183825!5m2!1sen!2sus',

  Maine: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92691.04435888634!2d-70.55007934228574!3d43.44817099174576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb2af789390c709%3A0xfaac2f30f3b90287!2sSwamp%20Grass%20Ln%2C%20Arundel%2C%20ME%2004046!5e0!3m2!1sen!2sus!4v1601597899941!5m2!1sen!2sus',

  Texas: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55316.95401155341!2d-97.42215203153161!3d29.94177138075298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864361d21567bf83%3A0x6f8fcfd7dd30d88e!2sArdor%20Wood%20Farm!5e0!3m2!1sen!2sus!4v1601511502193!5m2!1sen!2sus',

  Washington: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87136.04105639421!2d-123.01201287000266!3d46.961664804994264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5491713b3b939523%3A0xfaeb325183951806!2sHealing%20Hearts%20Ranch!5e0!3m2!1sen!2sus!4v1601598088967!5m2!1sen!2sus',
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

// Create 1 Random Camp
// FOR MONGOOSE: IN THE SAME SCHEMA FORMAT AS CAMP SCHEMA in index.js
// FOR MONGOOSE: Maintaing Camp's schema format from index.js will save extra work
const createCamp = (numImages) => {
  // note that camp.id will be auto_generated in data table/collection
  const camp = {};
  let campImageNum = Math.floor(Math.random() * numImages) + 1;
  // reassign campImageNum random number until unique in campImageNums
  while (campImageNums[campImageNum]) {
    campImageNum = Math.floor(Math.random() * numImages) + 1;
  }
  campImageNums[campImageNum] = campImageNum;

  camp.name = randomCampName();
  camp.name = camp.name.replace(/'/g, "''"); // escape single quote with two single quotes for SQL syntax (O'Conner -> O''Conner)
  camp.property = `${faker.address.streetName()} ${campPropertySuffixName[Math.floor(Math.random() * campPropertySuffixName.length)]}`;
  camp.property = camp.property.replace(/'/g, "''");
  camp.state = campState[Math.floor(Math.random() * campState.length)];
  camp.responses = randomCampResponses(); // responses: 0 - 2000
  camp.rating = randomCampRating(camp.responses);
  camp.image = `https://timcamp.s3-us-west-1.amazonaws.com/camp${campImageNum}.jpg`; // images camp 1 - numImages
  camp.map = campMap[camp.state];

  return camp;
};

const createCamps = (numCamps = 100, numImages = 300) => {
  const campsArr = [];
  for (let i = 0; i < numCamps; i += 1) {
    campsArr.push(createCamp(numImages));
  }
  return campsArr;
};


const insertData = () => {
  const campsData = createCamps(100, 346);


  db.Camps.insertMany(campsData, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('seeded successfully!!!!');
    }
  });
};

insertData();


// const createCamp = () => {
//   const camp = {};

//   camp.name = faker.lorem.word();
//   camp.property = faker.address.city();
//   camp.state = faker.address.state();
//   camp.responses = faker.random.number();
//   camp.rating = faker.random.number();
//   camp.image = faker.random.image();
//   camp.map = faker.random.image()

//   return camp;
// };

// const createCamps = () => {
//   const campsArr = [];

//   for (let i = 0; i < 100; i++) {
//     campsArr.push(createCamp());
//   }

//   db.Suggestions.insertMany(campsArr, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('seeded successfully!!!!');
//     }
//   });
// };

// createCamps();