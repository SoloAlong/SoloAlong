'use strict';

const expect = require('chai').expect;
const chords = require(__dirname + '/../lib/logic/chords');
const fs = require('fs');

describe('Check to see if all paths to audio work from chord object', () => {
  var ch = Object.keys(chords);
  for (let i = 0; i < ch.length; i++) {
    it(ch[i] + ' should have a real filepath to its audio', () => {
      let key = ch[i];
      let path = chords[key].audio;
      let f = fs.readFileSync(path);
      expect(f instanceof Buffer).to.eql(true);
    });
  }
});
