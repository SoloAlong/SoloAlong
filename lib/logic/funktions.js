'use strict';

const keys = module.exports.keys = exports =
  ['a', 'b♭', 'b', 'c', 'd♭', 'd', 'e♭', 'e', 'f', 'g♭', 'g', 'a♭'];
const synonymKeys = {
  'a♯': 'b♭',
  'c♯': 'd♭',
  'd♯': 'e♭',
  'f♯': 'g♭',
  'g♯': 'a♭',
  'c♭': 'b'
};

module.exports.validateKey = exports = function(key) {
  key = key ? key.toLowerCase() : 'a';
  var root = keys.indexOf(key);
  // if root isn't in our keys array, we'll check for synonyms | default
  if (root === -1) {
    Object.keys(synonymKeys).map( (value) => {
      if (value === key) root = keys.indexOf(synonymKeys[value]);
    });
    if (root === -1) {
      // console.log('Sorry, only these keys are supported at this time: ' +
      //   '\n"a", "b♭", "b", "c", "c♯","d♭", "d", "e♭", "e", "f", "f♯", "g♭", "g", "a♭"' +
      //   '\nDEFAULT KEY: a minor');
      root = 0;
    }
  }
  return root;
};

module.exports.scale = exports = function(root, orientation) {
  const happyOrSad = {
    minor: [keys[root], keys[(root + 2) % 12], keys[(root + 3) % 12],
      keys[(root + 5) % 12], keys[(root + 7) % 12],
      keys[(root + 8) % 12], keys[(root + 10) % 12]],
    major: [keys[root], keys[(root + 2) % 12], keys[(root + 4) % 12],
      keys[(root + 5) % 12], keys[(root + 7) % 12],
      keys[(root + 9) % 12], keys[(root + 11) % 12]]
  };
  return orientation && happyOrSad[orientation.toLowerCase()] ?
    happyOrSad[orientation.toLowerCase()] : happyOrSad.minor;
};
