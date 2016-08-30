
/**
 * Module dependencies.
 */
 
 //express routing

var express = require('express');
var user = require('./routes/user');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('jsonp callback name', 'callback');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', user.login_temp);
app.get('/registry', user.registration);
app.post('/registry', user.registry);
app.get('/login', user.login_temp);
app.post('/login', user.login);
app.get('/search', user.search_tmp);
//assignment2 api
app.get('/api', api.api);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
