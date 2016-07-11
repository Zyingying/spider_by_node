'use strict'

var fs = require('fs')
var util = require('util')
var assert = require('assert')

var detect = require('../')

var src = fs.readFileSync(__dirname + '/fixtures/example.html', 'utf8')

describe('detect(src)', function () {
  it('detects HREFs', function () {
    contains(detect(src), [
      '/static/2.0.0/style.css',
      '/static/2.0.0/image.png',
      'http://www.forbeslindesay.co.uk',
      'http://www.iconarchive.com/show/drinks-icons-by-miniartx/Cocktail-Purple-Passion-icon.html'])
  })
  it('detects SRCs', function () {
    contains(detect(src), ['bar.js', 'foo.js'])
  })
  it('detects MANIFESTs', function () {
    contains(detect(src), ['/bop.manifest'])
  })
  it('is fast', function () {
    for (var i = 0; i < 1000; i++) {
      detect(src)
    }
  })
})

function contains(a, b) {
  assert(Array.isArray(a), inspect(a) + ' instanceof Array')
  for (var i = 0; i < b.length; i++) {
    assert(a.indexOf(b[i]) != -1, inspect(b[i]) + ' in ' + inspect(a))
  }
}
function inspect(obj) {
  return util.inspect(obj)
}