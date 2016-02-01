const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var cpSchema = new mongoose.Schema({
   name: String || Date,
   date: Date,
   userid: String,
   chords: Array
});

module.exports = exports = mongoose.model('Cp', cpSchema);
