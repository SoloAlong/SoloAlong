const fs = require('fs');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
const CPmodel = require(__dirname + '/../models/cp');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var soloRouter = module.exports = exports = express.Router();

//route zero
soloRouter.get('/', (req, res) => {
  fs.readStream('index.html').pipe(res);
});

//route 3
soloRouter.post('/newCP', jwtAuth, (req, res) => {
  CPmodel.save(err, stuff)//this needs work
});

//route 4
soloRouter.get('/profile', jwtAuth, (req, res) => {
  CPmodel.find({user: req.user.id}, (err, userCP) => {
    if (err) {
      return handleDBError(err, res);
    }
    if (!userCP) {
      return res.end();
    } //do more stuff
  });
});

soloRouter.get('/profile.js', (req, res) => {
  fs.readStream('profile.js').pipe(res);
});
