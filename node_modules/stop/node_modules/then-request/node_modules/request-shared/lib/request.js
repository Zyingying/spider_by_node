'use strict';

var url = require('url');
var qs = require('qs');
var copy = require('./copy');
var type = require('./type');

// we use `qs` to support nesting but need `unescape` which is available in `querystring`
qs.unescape = qs.unescape || require('querystring').unescape;

var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = Request;


/**
 * A Web Request
 *
 * Options:
 *
 *  - `uri` || `url` - fully qualified uri or parsed url object from `url.parse()`
 *  - `method` - http method (default: `"GET"`)
 *  - `qs` - object containing querystring values to be appended to the `uri`
 *  - `headers` - http headers (default: `{}`)
 *  - `body` - entity body for PATCH, POST and PUT requests. Must be a `Buffer` or `String`.
 *  - `auth` - A hash containing values `user` || `username`, `password` || `pass`
 *  - `encoding` - encoding to stringify the result body, set this to `null` to get a `Buffer`
 *
 * @param {String} uri
 * @param {Object} options
 */
function Request(uri, options) {
  // 1 - handle variable list of arguments
  if (typeof uri === 'undefined') {
    throw new TypeError('undefined is not a valid uri or options object.');
  }
  if (options && typeof options === 'object') {
    options.uri = uri;
  } else if (typeof uri === 'string') {
    options = {uri: uri};
  } else {
    options = uri;
  }
  options = copy(options);
  if (options.url && !options.uri) {
    options.uri = options.url;
    delete options.url;
  }

  // 2 - check types
  type('uri', options.uri, 'String|Object');
  type('options.method', options.method, 'String?');
  type('options.qs', options.qs, 'Object?');
  type('options.headers', options.headers, 'Object?');
  if (options.body !== undefined && !Buffer.isBuffer(options.body)) {
    type('options.body', options.body, 'String|Buffer');
  }
  type('options.auth', options.auth, 'Object?');

  // 3 - normalize types
  if (typeof options.uri === 'string') {
    options.uri = url.parse(options.uri);
  }
  options.method = (options.method || 'GET').toUpperCase();
  if (options.qs) {
    var baseQs = qs.parse(options.uri.query);
    for (var i in options.qs) {
      baseQs[i] = options.qs[i];
    }
    if (qs.stringify(baseQs) !== '') {
      options.uri = url.parse(options.uri.href.split('?')[0] + '?' + qs.stringify(baseQs));
    }
  }
  options.headers = options.headers || {};
  if (typeof options.body === 'string') {
    options.body = new Buffer(options.body);
  }
  if (!options.body) {
    options.body = new Buffer(0);
  }
  if (options.auth) {
    if (hasOwnProperty.call(options.auth, 'username'))
      options.auth.user = options.auth.username;
    if (hasOwnProperty.call(options.auth, 'password'))
      options.auth.pass = options.auth.password;
  } else if (options.uri.auth) {
    var authPieces = options.uri.auth.split(':').map(function(item){
      return qs.unescape(item);
    });
    options.auth = {
      user: authPieces[0],
      pass: authPieces.slice(1).join(':')
    };
    delete options.uri.auth;
  }
  if (options.auth) {
    var authHeader = options.auth.pass === undefined ?
        options.auth.user :
        options.auth.user + ':' + options.auth.pass;
    options.headers['authorization'] = 'Basic ' + toBase64(authHeader);
  }
  for (var key in options.headers) {
    type('options.headers[' + key + ']', options.headers[key], 'String');
    if (options.headers[key] === '') {
      delete options.headers[key];
    }
  }
  if (module.exports.native && !options.headers['content-type']) {
    options.headers['content-type'] = '';
  }
  if (module.exports.native && !options.headers['accept']) {
    options.headers['accept'] = '';
  }

  this.protocol = options.uri.protocol.replace(/\:$/, '');
  this.host = options.uri.hostname;
  this.port = options.uri.port;
  this.path = options.uri.path;
  this.method = options.method;
  this.headers = options.headers;
  this.headers['content-length'] = options.body.length;
  this.body = options.body;
}


/**
 * Convert a string into its base64 representation
 *
 * @param {String} str
 * @return {String}
 */
function toBase64(str) {
  return (new Buffer(str || "", "ascii")).toString("base64")
}
