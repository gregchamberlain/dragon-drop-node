const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./routes/api');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MongoConfig = require('./config/mongo.js');
mongoose.connect(MongoConfig)
  .then(() => console.log('connection successfull'))
  .catch(err => console.error(err));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('This will be the site!');
});

app.use('/api', api);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send(err);
  } else {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
