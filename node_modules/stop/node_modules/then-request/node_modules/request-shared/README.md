# request-shared

Logic for normalizing arguments for an http request

[![Build Status](https://travis-ci.org/ForbesLindesay/request-shared.png?branch=master)](https://travis-ci.org/ForbesLindesay/request-shared)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/request-shared.png)](https://gemnasium.com/ForbesLindesay/request-shared)
[![NPM version](https://badge.fury.io/js/request-shared.png)](http://badge.fury.io/js/request-shared)

## Installation

    npm install request-shared

## Request

```js
var Request = require('request-shared').Request;
var req = new Request('http://www.example.com', {method: 'post'});
```

## Response

```js
var Response = require('request-shared').Response;
var res = new Response(200, {}, new Buffer('A ok'));
//res.statusCode === 200
//res.headers === {}
//res.body === new Buffer('A ok')
res.getBody();
// => new Buffer('A ok')

var res = new Response(404, {'Header': 'value'}, new Buffer('Wheres this page'));
//res.statusCode === 404
//res.headers === {header: 'value'}
//res.body === new Buffer('Wheres this page')
res.getBody();
// => throws error with `statusCode`, `headers` and `body` properties.
```

## License

  MIT