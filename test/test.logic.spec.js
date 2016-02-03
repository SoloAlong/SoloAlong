'use strict';

const expect = require('chai').expect;
const notes = require(__dirname + '/../lib/logic/funktions');
const keys = notes.keys;
const chords = require(__dirname + '/../lib/logic/notesOfChords');
const eScale = [ 'e', 'g♭', 'a♭', 'a', 'b', 'd♭', 'e♭' ];
const eChordNotes = [
    [ 'e', 'a♭', 'b' ],
    [ 'g♭', 'a', 'd♭' ],
    [ 'a♭', 'b', 'e♭' ],
    [ 'a', 'd♭', 'e' ],
    [ 'b', 'e♭', 'g♭' ],
    [ 'd♭', 'e', 'a♭' ],
    [ 'e♭', 'g♭', 'a' ]
  ];
const eChordNames =
  [ 'e major',
    'g♭ minor',
    'a♭ minor',
    'a major',
    'b major',
    'd♭ minor',
    'e♭ diminished'
  ];

// test input key validation and transfer to index of master scale
describe('validate a valid note', () => {
  it('should validate the valid input', () => {
    expect(notes.validateKey('a')).to.eql(0);
  });
});
describe('coerce an invalid note to 0', () => {
  it('should coerce the invalid input', () => {
    expect(notes.validateKey('aa;ldjsfladsj')).to.eql(0);
  });
});
describe('coerce an synonym note to 1', () => {
  it('should coerce the synonym input', () => {
    expect(notes.validateKey('a♯')).to.eql(1);
  });
});
describe('coerce an invalid note to 0', () => {
  it('should coerce the invalid input', () => {
    expect(notes.validateKey('r')).to.eql(0);
  });
});

// test input key validation and transfer to index of master scale
describe('get an Array scale back given a key', () => {
  it('should give back full scale of key', () => {
    expect(Array.isArray(notes.scale(0, 'minor'))).to.eql(true);
  });
});
describe('get a scale given a key, orientation specified', () => {
  it('should give back full scale of key', () => {
    expect(notes.scale(0)).to.eql(
      [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]);
  });
});
describe('get a scale given a key', () => {
  it('should give back full scale of key', () => {
    expect(notes.scale(7, 'major')).to.eql(
      [ 'e', 'g♭', 'a♭', 'a', 'b', 'd♭', 'e♭' ]);
  });
});
describe('get a scale given a key and uppercase orientation', () => {
  it('should give back full scale of key', () => {
    expect(notes.scale(7, 'MAJOR')).to.eql(
      [ 'e', 'g♭', 'a♭', 'a', 'b', 'd♭', 'e♭' ]);
  });
});
describe('get a minor scale given a key and error in orientation', () => {
  it('should give back full scale of key', () => {
    expect(notes.scale(7, 'MAJORS')).to.eql(
      [ 'e', 'g♭', 'g', 'a', 'b', 'c', 'd' ]);
  });
});

// test array of arrays is getting back to us
describe('put in a scale and get back Array of Arrays for scale', () => {
  it('should be Arrays of Arrays', () => {
    expect(Array.isArray(chords.chords(eScale))).to.eql(true);
    expect(Array.isArray(chords.chords(eScale)[1])).to.eql(true);
  });
});
describe('put in e major and get back chord arrays of emajor chords', () => {
  it('should be Arrays of Arrays', () => {
    expect(chords.chords(eScale)).to.eql(eChordNotes);
  });
});

// test if we get back an array of notes
describe('get Array back from chord Array of notes', () => {
  it('should give back string names of the chords', () => {
    expect(Array.isArray(chords.chordNames(eChordNotes))).to.eql(true);
  });
});
describe('get Array of chord names back from chord Array of notes', () => {
  it('should give back string names of the chords', () => {
    expect(chords.chordNames(eChordNotes)).to.eql(eChordNames);
  });
});

// test that every entry in every array is a string
for (let i = 0; i < keys.length; i++) {
  describe('check Arrays have been turned into a string: ' + keys[i], () => {
    it('should check that we have strings instead of Arrays', () => {
      let note = notes.validateKey(keys[i]);
      let scale = notes.scale(note);
      let chordArray = chords.chords(scale);
      let chordStrings = chords.chordNames(chordArray);
      for (let j = 0; j < chordStrings.length; j++) {
        expecter(j);
      }
      function expecter(h) {
        expect(typeof chordStrings[h]).to.eql('string');
      }
    });
  });
}
