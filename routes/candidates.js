var express = require('express');
var router = express.Router();

// working with mongoose and reviews
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Candidate = mongoose.model('Candidate', {
    firstname: 'string',
    lastname: 'string',
    email: 'string'
});


router.post('/', function (req, res) {

    (new Candidate({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email
    })).save(function (err) {

            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});