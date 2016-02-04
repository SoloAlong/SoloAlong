const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const authRouter = require(__dirname + '/../routes/auth_router.js');
const router = require(__dirname + '/../routes/router.js');
const fs = require('fs');
mongoose.connect('mongodb://localhost/test_app_dev');

app.get('/', (req, res) => {
  var index = fs.createReadStream(__dirname + '/../public/index.html');
  index.pipe(res);
});

app.get('/index', (req, res) => {
  var index = fs.createReadStream(__dirname + '/../public/index.html');
  index.pipe(res);
});

app.get('/home', (req, res) => {
  var index = fs.createReadStream(__dirname + '/../public/index.html');
  index.pipe(res);
});

app.get('/profiles', (req, res) => {
  var index = fs.createReadStream(__dirname + '/../public/profile.html');
  index.pipe(res);
});

app.get('/chordsInKey', (req, res) => {
  var index = fs.createReadStream(__dirname + '/../public/chordsInKey.html');
  index.pipe(res);
});

app.get('/player', (req, res) => {
  var index = fs.createReadStream(__dirname + '/../public/player2.html');
  index.pipe(res);
});

app.use(authRouter);
app.use(router);

var PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server up on port : ' + PORT));
