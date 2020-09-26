const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helper = require('../database/helper.js');

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/camps', (req, res) => {
  helper.getNine((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}`);
});
