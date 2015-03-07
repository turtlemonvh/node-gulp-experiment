var express = require('express'),
    cons = require('consolidate'),
    underscore = require('underscore'),
    path = require('path');

var app = express();

app.engine('html',cons.underscore);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/static', express.static('public'));

// Main Views
app.get('/', function (req, res) {
  res.render('home.html', { title: 'Home' });
})
app.get('/login', function (req, res) {
  res.render('login.html', { title: 'Login' });
})
app.get('/app', function (req, res) {
  res.render('app.html', { title: 'App' });
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})