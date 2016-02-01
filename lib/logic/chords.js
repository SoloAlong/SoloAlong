'use strict';

module.exports = exports = {
  'A major': { 'name': 'A major', 'notes': [ 'a', 'd♭', 'e' ] },
  'a minor': { 'name': 'a minor', 'notes': [ 'a', 'c', 'e' ] },
  'a diminished': { 'name': 'a diminished', 'notes': [ 'a', 'c', 'e♭'] },

  'B major': { 'name': 'B major', 'notes': [ 'b', 'e♭', 'g♭' ] },
  'b minor': { 'name': 'b minor', 'notes': [ 'b', 'd', 'g♭' ] },
  'b diminished': { 'name': 'b diminished', 'notes': [ 'b', 'd', 'f' ] },

  'C major': { 'name': 'C major', 'notes': [ 'c', 'e', 'g' ] },
  'c minor': { 'name': 'c minor', 'notes': [ 'c', 'e♭', 'g' ] },
  'c diminished': { 'name': 'c diminished', 'notes': [ 'c', 'e♭', 'g♭'] },

  'D major': { 'name': 'D major', 'notes': [ 'd', 'g♭', 'a' ] },
  'd minor': { 'name': 'd minor', 'notes': [ 'd', 'f', 'a' ] },
  'd diminished': { 'name': 'd diminished', 'notes': [ 'd', 'f', 'a♭'] },

  'E major': { 'name': 'E major', 'notes': [ 'e', 'a♭', 'b' ] },
  'e minor': { 'name': 'e minor', 'notes': [ 'e', 'g', 'b' ] },
  'e diminished': { 'name': 'e diminished', 'notes': [ 'e', 'g', 'b♭'] },

  'F major': { 'name': 'F major', 'notes': [ 'f', 'a', 'c' ] },
  'f minor': { 'name': 'f minor', 'notes': [ 'f', 'a♭', 'c' ] },
  'f diminished': { 'name': 'f diminished', 'notes': [ 'f', 'a♭', 'b'] },

  'G major': { 'name': 'G major', 'notes': [ 'g', 'b', 'd' ] },
  'g minor': { 'name': 'g minor', 'notes': [ 'g', 'b♭', 'd' ] },
  'g diminished': { 'name': 'g diminished', 'notes': [ 'g', 'b♭', 'd♭'] },

  'A♭ major': { 'name': 'A♭ major', 'notes': [ 'a♭', 'c', 'e♭' ] },
  'a♭ minor': { 'name': 'a♭ minor', 'notes': [ 'a♭', 'b', 'e♭' ] },
  //'G♯ major': { 'name': 'G♯ major', 'notes': [ 'a♭', 'c', 'e♭' ] },
  //'g♯ minor': { 'name': 'g♯ minor', 'notes': [ 'a♭', 'b', 'e♭' ] },
  //'g♯ diminished': { 'name': 'g♯ diminished', 'notes': [ 'a♭', 'b', 'd'] },
  'a♭ diminished': { 'name': 'a♭ diminished', 'notes': [ 'a♭', 'b', 'd'] },

  'B♭ major': { 'name': 'B♭ major', 'notes': [ 'b♭', 'd', 'f' ] },
  'b♭ minor': { 'name': 'b♭ minor', 'notes': [ 'b♭', 'd♭', 'f' ] },
  //'A♯ major': { 'name': 'A♯ major', 'notes': [ 'b♭', 'd', 'f' ] },
  //'a♯ minor': { 'name': 'a♯ minor', 'notes': [ 'b♭', 'd♭', 'f' ] },
  //'a♯ diminished': { 'name': 'a♯ diminished', 'notes': [ 'b♭', 'd♭', 'e'] },
  'b♭ diminished': { 'name': 'b♭ diminished', 'notes': [ 'b♭', 'd♭', 'e'] },

  'D♭ major': { 'name': 'D♭ major', 'notes': [ 'd♭', 'f', 'a♭' ] },
  'd♭ minor': { 'name': 'd♭ minor', 'notes': [ 'd♭', 'e', 'a♭' ] },
  //'C♯ major': { 'name': 'C♯ major', 'notes': [ 'd♭', 'f', 'a♭' ] },
  //'c♯ minor': { 'name': 'c♯ minor', 'notes': [ 'd♭', 'e', 'a♭' ] },
  //'c♯ diminished': { 'name': 'c♯ diminished', 'notes': [ 'd♭', 'e', 'g'] },
  'd♭ diminished': { 'name': 'd♭ diminished', 'notes': [ 'd♭', 'e', 'g'] },

  'E♭ major': { 'name': 'E♭ major', 'notes': [ 'e♭', 'g', 'b♭' ] },
  'e♭ minor': { 'name': 'e♭ minor', 'notes': [ 'e♭', 'g♭', 'b♭' ] },
  //'D♯ major': { 'name': 'D♯ major', 'notes': [ 'e♭', 'g', 'b♭' ] },
  //'d♯ minor': { 'name': 'd♯ minor', 'notes': [ 'e♭', 'g♭', 'b♭' ] },
  //'d♯ diminished': { 'name': 'd♯ diminished', 'notes': [ 'e♭', 'g♭', 'a'] },
  'e♭ diminished': { 'name': 'e♭ diminished', 'notes': [ 'e♭', 'g♭', 'a'] },

  'G♭ major': { 'name': 'G♭ major', 'notes': [ 'g♭', 'b♭', 'd♭' ] },
  'g♭ minor': { 'name': 'g♭ minor', 'notes': [ 'g♭', 'a', 'd♭' ] },
  //'F♯ major': { 'name': 'F♯ major', 'notes': [ 'g♭', 'b♭', 'd♭' ] },
  //'f♯ minor': { 'name': 'f♯ minor', 'notes': [ 'g♭', 'a', 'd♭' ] },
  //'f♯ diminished': { 'name': 'f♯ diminished', 'notes': [ 'g♭', 'a', 'c'] },
  'g♭ diminished': { 'name': 'g♭ diminished', 'notes': [ 'g♭', 'a', 'c'] }
};
