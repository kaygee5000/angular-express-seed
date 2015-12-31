
/**
 * Module dependencies
 */
var express = require('express');
var app = express();
var path = require('path');

app.use('/static', express.static(path.join(__dirname + '/front')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/front/web.html'));
});

app.get('/gallery', function(req, res) {
  res.sendFile(path.join(__dirname + '/front/gallery.html'));
});

app.get('/testimonials', function(req, res) {
  res.sendFile(path.join(__dirname + '/front/testimonials.html'));
});

app.get('/trends', function(req, res) {
  res.sendFile(path.join(__dirname + '/front/trends.html'));
});

app.get('/privacy', function(req, res) {
  res.sendFile(path.join(__dirname + '/front/privacy.html'));
});

// viewed at http://localhost:8080
app.listen(process.env.PORT || 8080);