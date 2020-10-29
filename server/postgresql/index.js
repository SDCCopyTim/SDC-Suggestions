const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helper = require('../../database/postgresql/helper.js')
const morgan = require('morgan');
const app = express();
const port = 3005;

require('newrelic');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/camp/:id', (req, res) => {
  helper.one(req.params.id, (err, results) => {
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