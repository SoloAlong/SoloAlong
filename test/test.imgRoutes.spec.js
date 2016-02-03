'use strict';

const expect = require('chai').expect;
const chords = require(__dirname + '/../public/scripts/chords');
const fs = require('fs');

describe('Check to see if all paths to images work from chord object', () => {
  var ch = Object.keys(chords);
  for (let i = 0; i < ch.length; i++) {
    it(ch[i] + ' should have a real filepath to its images', () => {
      let key = ch[i];
      let path = chords[key].image;
      let f = fs.readFileSync(__dirname + '/../public' + path);
      expect(f instanceof Buffer).to.eql(true);
    });
  }
});
