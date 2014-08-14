var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

exports.Contact = mongoose.model(
    'Contact',
    new mongoose.Schema({
		firstName: String,
		lastName: String,
		phone: String,
		email: String
	})
);

exports.getContacts = function(req, res) {
	exports.Contact.find({}, function(err, objs){
		res.json(objs);
	});
};

exports.getContact = function(req, res) {
	var id = req.params.id;
	exports.Contact.findById(id, function(err, obj){
		res.json(obj);
	});
};

exports.findByName = function(req, res) {
	var query = req.params.query;
	var re = new RegExp(query, 'i');
	exports.Contact.find({ $or: [ {lastName:re}, {firstName:re} ]}, function(err, obj){
		res.json(obj);
	});
};

exports.saveContact = function(req, res) {
    var firstName = req.param('firstName', undefined);
    var lastName = req.param('lastName', undefined);
    var email = req.param('email', undefined);
    var phone = req.param('phone', undefined);

    var newContact = new exports.Contact({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
    });

    newContact.save(function(error, contact) {
        if(error) {
            res.send(500, 'An error occurred: ' + error);
        }

        res.send(contact);
    });
};

exports.deleteContact = function(req, res) {
    console.log(req.param('id'));
    var id = req.param('id');
    exports.Contact.findById(id, function(error, obj) {
        if(error) {
            res.send(500, 'An error occurred: ' + error);
        }

        obj.remove();
		res.json(obj);
	});
};