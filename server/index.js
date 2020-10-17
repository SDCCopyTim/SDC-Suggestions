const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helper = require('../database/helper.js');
const morgan = require('morgan');

const app = express();

const port = 3005;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(cors());
app.use(morgan('dev'));

app.get('/api/camp', (req, res) => {
  helper.getOne((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/api/camps', (req, res) => {
  helper.getTwelve((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/camps', (req, res) => {
  helper.postOne(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("successful post");
    }
  });
});


app.put('/api/camps/:id', (req, res) => {
  helper.updateOne(req.params.id, req.body, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("successful update");
    }
  });
});

app.delete('/api/camps/:id', (req, res) => {
  helper.deleteOne(req.params.id, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("successful delete");
    }
  });
});



app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}`);
});
