const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('../../database/mongoDB/index.js');

const app = express();
const port = 3005;

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../../client/dist')));


app.get('/api/camps', (req, res) => {
  db.Suggestions.aggregate([{ $sample: { size: 100 } }], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => console.log(`LISTENING ON PORT:${port}`));