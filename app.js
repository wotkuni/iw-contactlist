var config = require('./config');

var express = require('express');
var mongoose = require('mongoose');

var contact = require('./models/contact');


mongoose.connect(config.mongodb);


var app = express();
app.listen(config.port);


app.configure(function() {
    app.use(express.json());
    app.set('views', __dirname + '/views');
    app.use('/-/', express.static(__dirname + '/static'));
    app.use(app.router);
});


// index page
app.get('/', function(req, res) {
	res.render('index.jade')
});


// API routes
app.get('/api/contacts', contact.getContacts);
app.get('/api/contacts/:id', contact.getContact);
app.get('/api/contacts/search/:query', contact.findByName);

app.post('/api/contacts/save', contact.saveContact);
app.post('/api/contacts/delete', contact.deleteContact);


// 404
//app.get('/*', function(req, res) {
//	throw new NotFound();
//});
//
//
//function NotFound(msg) {
//	this.name = 'NotFound';
//	Error.call(this, msg);
//	Error.captureStackTrace(this, arguments.callee);
//}


console.log('Listening on http://0.0.0.0:' + config.port);