const fs = require('fs');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
const CPmodel = require(__dirname + '/../models/cp');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const dictionary = require(__dirname + '/../public/scripts/chords');

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
  CPmodel.find({userid: req.user.id}, (err, chords) => {
    if (err) {
      return handleDBError(err, res);
    }

    User.find({_id: req.user.id}, (err, user) => {
      if (err) {
        return handleDBError(err, res);
      }
      chordArray = [];

      for (var i = 0; i < chords.length; i += 1) {
        var chord = {};
        chord.name = chords[i].name;
        chord.chord1 = dictionary[chords[i].chords[0]];
        chord.chord2 = dictionary[chords[i].chords[1]];
        chord.chord3 = dictionary[chords[i].chords[2]];
        chord.chord4 = dictionary[chords[i].chords[3]];
        chordArray.push(chord);
      }

      return res.status(200).json(chordArray);
    });
  });
});
