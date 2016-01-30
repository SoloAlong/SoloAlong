'use strict';

const notesOfChords = require(__dirname + '/notesOfChords');
const funk = require(__dirname + '/funktions');

// validate root note and key/orientation
var pickedKey = funk.validateKey(process.argv[2]);
var scale = funk.scale(pickedKey, process.argv[3]);

// get notes of each chord in key, then the name of each chord
var chordArray = notesOfChords.chords(scale);
var chordNames = notesOfChords.chordNames(chordArray);

// shout out the chords (this will be re-adapted for app)
console.log('\nUSABLE CHORDS FOR ' + funk.keys[pickedKey] +
  ' : ' + chordNames);
console.log('\nRANDOM PROGRESSION FOR ' + funk.keys[pickedKey] +
  ' : ' + notesOfChords.random(chordNames));
console.log('\nBLUES PROGRESSION FOR ' + funk.keys[pickedKey] +
  ' : ' + notesOfChords.blues(chordNames));
