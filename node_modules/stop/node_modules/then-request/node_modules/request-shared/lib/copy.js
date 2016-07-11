'use strict';

module.exports = copy;

function copy(obj, seen) {
  seen = seen || [];
  if (seen.indexOf(obj) !== -1) {
    throw new Error('Unexpected circular reference in options');
  }
  seen.push(obj);
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return copy(item, seen);
    });
  } else if (obj && typeof obj === 'object' && !Buffer.isBuffer(obj)) {
    var o = {}
    Object.keys(obj).forEach(function (i) {
      o[i] = copy(obj[i], seen)
    })
    return o
  } else {
    return obj;
  }
}