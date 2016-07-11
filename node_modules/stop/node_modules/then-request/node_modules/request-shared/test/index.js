'use strict';

var test = require('testit');
var assert = require('assert');
var Request = require('../').Request;
var Response = require('../').Response;

test('request', function () {
  var req = new Request('http://www.example.com/foo?bar=baz');
  assert(req.protocol === 'http');
  assert(req.host === 'www.example.com');
  assert(req.port === null);
  assert(req.path === '/foo?bar=baz');
  assert(req.method === 'GET');
  assert(req.headers['content-length'] === 0);
  assert(Buffer.isBuffer(req.body));
  assert(req.body.length === 0);
  req = new Request('https://example.com:3000', {
    method: 'post',
    qs: {foo: 'bar'},
    body: 'foo bar'
  });
  assert(req.protocol === 'https');
  assert(req.host === 'example.com');
  assert(req.port === '3000');
  assert(req.path === '/?foo=bar');
  assert(req.method === 'POST');
  assert(req.headers['content-length'] === 7);
  assert(Buffer.isBuffer(req.body));
  assert(req.body.toString() === 'foo bar');
});
test('response', function () {
  var res = new Response(200, {
    'Foo-Bar': 'baz-Bosh',
    'bar-foo': 'bish-Bosh'
  }, 'foo bar baz');
  assert(res.statusCode = 200);
  assert(res.headers['foo-bar'] === 'baz-Bosh');
  assert(res.headers['bar-foo'] === 'bish-Bosh');
  assert(res.body === 'foo bar baz');
  assert(res.getBody() === 'foo bar baz');

  res = new Response(404, {
    'Foo-Bar': 'baz-Bosh'
  }, 'Could not find page');
  assert(res.statusCode = 404);
  assert(res.headers['foo-bar'] === 'baz-Bosh');
  assert(res.body === 'Could not find page');
  try {
    res.getBody();
  } catch (ex) {
    assert(ex.statusCode === 404);
    assert(ex.headers['foo-bar'] === 'baz-Bosh');
    assert(res.body === 'Could not find page');
    return;
  }
  throw new Error('res.getBody() should throw an error when the status code is 404');
});