const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
const CPmodel = require(__dirname + '/../models/cp');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const dictionary = require(__dirname + '/../public/scripts/chords');
const chordNames = require(__dirname + '/../lib/logic/index.js')

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
  CPmodel.find( { userid: req.user.id }, (err, chords) => {
    if (err) {
      return handleDBError(err, res);
    }

    User.find( { _id: req.user.id }, (err, user) => {
      if (err) {
        return handleDBError(err, res);
      }
      var chordArray = [];

      for (var i = 0; i < chords.length; i += 1) {
        var chord = {};
        chord.id = chords[i]._id;
        chord.name = chords[i].name;
        chord.chord1 = dictionary[chords[i].chords[0]];
        chord.chord2 = dictionary[chords[i].chords[1]];
        chord.chord3 = dictionary[chords[i].chords[2]];
        chord.chord4 = dictionary[chords[i].chords[3]];
        chordArray.push(chord);
      }
      return res.status(200).json( { chord: chordArray, userinfo: user } );
    });
  });
});

soloRouter.get('/chordsInKeyz', jwtAuth, jsonParser, (req, res) => {
  var k = req.headers.key;
  k = (k.endsWith('flat')) ? req.headers.key.charAt(0) + '♭' : k;
  var o = req.headers.orientation;
  var names = chordNames(k, o);
  var chord = {}
  chord.name = k + ' ' + o;
  chord.chord1 = dictionary[names[0]];
  chord.chord2 = dictionary[names[1]];
  chord.chord3 = dictionary[names[2]];
  chord.chord4 = dictionary[names[3]];
  chord.chord5 = dictionary[names[4]];
  chord.chord6 = dictionary[names[5]];
  chord.chord7 = dictionary[names[6]];
  return res.status(200).json(chord);
});

soloRouter.get('/player2', jwtAuth, jsonParser, (req, res) => {
  CPmodel.find( { _id: req.headers.chordid }, (err, chords) => {
    if (err) {
      return handleDBError(err, res);
    }
    if (!chords[0]) {
      return res.status(200).json({});
    }
    var obj = {};
    obj.name = chords[0].name;
    obj.chord1 = dictionary[chords[0].chords[0]];
    obj.chord2 = dictionary[chords[0].chords[1]];
    obj.chord3 = dictionary[chords[0].chords[2]];
    obj.chord4 = dictionary[chords[0].chords[3]];
    return res.status(200).json( obj );
  });
});
