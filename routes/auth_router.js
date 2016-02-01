const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handleDBError');
const basicHTTP = require(__dirname + '/../lib/basic_http');
const saveUserDB = require(__dirname + '/../lib/save_new_user');
const emailValidation = require(__dirname + '/../lib/email_validation.js');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res) => {

  if (!(req.body.email || '').length && emailValidation(req.body.email)) return res.status(200).json( { msg: 'Please enter a email' } );

  if (!(req.body.username || '').length) return res.status(200).json( { msg: 'Please enter a user name' } );

  if (!(req.body.password || '').length > 7) return res.status(200).json( { msg: 'Please enter password' } );


  User.find({ $or: [ { 'username': req.body.username }, { 'email': req.body.email } ] }, (err, data) => {
    if (err) return handleDBError(err, res);
    if (data.length) return res.status(200).json( { msg: 'user already exist; plese sign in this site' } );
    saveUserDB(req, res);
  });
});

authRouter.post('/signin', basicHTTP, (req, res) => {

  User.findOne( { 'authentication.email': req.basicHTTP.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json( { msg: 'invalid username or password' } );
    }

    if (!user) return res.status(401).json( { msg: 'invalid username or password' } );

    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json( { msg: 'invalid username or password' } );

    res.json( { token: user.generateToken() } );
  });
});
