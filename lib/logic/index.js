'use strict';

const notesOfChords = require(__dirname + '/notesOfChords');
const funk = require(__dirname + '/funktions');

module.exports = exports = function(key, orientation) {
  // validate root note and key/orientation
  var pickedKey = funk.validateKey(key);
  var scale = funk.scale(pickedKey, orientation);

  // get notes of each chord in key, then the name of each chord
  var chordArray = notesOfChords.chords(scale);
  var chordNames = notesOfChords.chordNames(chordArray);
  return chordNames;
};
