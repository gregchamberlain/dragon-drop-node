const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./routes/api');
const User = require('./models/user');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MongoConfig = process.env.MONGO_URL || require('./config/mongo.js');
mongoose.connect(MongoConfig)
  .then(() => console.log('connection successfull'))
  .catch(err => console.error(err));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const morgan = require('morgan');

app.use(morgan('combined'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  User.findOne({
    sessionToken: req.cookies['__DRAGONDROP__SESSION']
  }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.render('index', {user: null});
    user.populateSites((err1, u) => {
      if (err1) return console.log('ERROR: ', err1);
      user = u || 'null';
      res.render('index', {user});
    });
  });
});

app.use('/api', api);

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    console.log(err);
    return res.status(400).send(err);
  }
  if (err.name === 'ValidationError') {
    res.status(400).send(err);
  } else {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
