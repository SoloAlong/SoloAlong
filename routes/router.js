const fs = require('fs');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
const CPmodel = require(__dirname + '/../models/cp');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var soloRouter = module.exports = exports = express.Router();

//ROUTE 0: index.js
// to be handled in server
// validates root note, key/orientation
// gets notes and name of each chord
// shouts out the available chords

//ROUTE 1: SIGN UP
// to be handled in Auth Router
// validates email/pw, creates User

//ROUTE 2: SIGN IN
// to be handled in Auth Router
// validates User with basic HTTP, gets User info

//ROUTE 3: Submit NEW chord progression
// validates token, creates new CP in db
// updates and sends new profile page
soloRouter.post('/newCP', jwtAuth, jsonParser, (req, res) => {
  var newCP = new CPmodel(req.body);
  newCP.userid = req.user._id;
  newCP.save((err, newCPinfo) => {
    if (err) {return handleDBError(err, res);} //check for bad save
    res.status(200).json(newCPinfo);
  });
});


//ROUTE 4: GETS PROFILE INFO FROM DB
// used AFTER sign-up/sign-in
// validates token and returns profile info to profile.js
soloRouter.get('/profile', jwtAuth, (req, res) => {
  CPmodel.find({userid: req.user.id}, (err, data1) => {
    if (err) {
      return handleDBError(err, res);
    }
    var myChordProgression = data1[0].chords;
    User.find({_id:req.user.id}, (err, data2) => {
      if (err) {
        return handleDBError(err, res);
      }
      console.log(data2);
      return res.status(200).json(myChordProgression);//this needs work
    });
  });
});
