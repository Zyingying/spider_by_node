var express = require('express');
var app = express();
var data = '123';
app.get('/', function (req, res) {
  res.send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});