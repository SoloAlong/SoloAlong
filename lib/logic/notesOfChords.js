'use strict';

const chordDictionary = require(__dirname + '/chords');

// takes a scale and returns an array of note-arrays
module.exports.chords = exports = function(scale) {
  let chordsInThisKey = [];
  for (let i = 0; i < scale.length; i++) {
    chordsInThisKey[i] = [ scale[i], scale[(i + 2) % 7], scale[(i + 4) % 7] ];
  }
  return chordsInThisKey;
};

// takes an array of notes-arrays and returns chord name
module.exports.chordNames = exports = function(notes) {
  for(let c in chordDictionary) { // eslint-disable-line
    var ch = chordDictionary[c];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i][0] === ch.notes[0] && notes[i][1] ===
        ch.notes[1] && notes[i][2] === ch.notes[2]) {
          notes[i] = c;
      }
    }
  }
  return notes;
};

// random 4 chord structure
module.exports.random = exports = function(chordNames) {
  return [chordNames[Math.floor(Math.random() * 7)],
    chordNames[Math.floor(Math.random() * 7)],
    chordNames[Math.floor(Math.random() * 7)],
    chordNames[Math.floor(Math.random() * 7)] ];
};

// simple rock chord structure
module.exports.blues = exports = function(chordNames) {
  return [chordNames[0], chordNames[3],
    chordNames[4], chordNames[3]];
};
