var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Candidate = mongoose.model('Candidate', {
    firstname: 'string',
    lastname: 'string',
    email: 'string'
});


router.post('/candidates', function (req, res) {
        console.log(req.body);
    (new Candidate({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })).save(function (err) {

            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});

router.get('/candidates', function (req,res) {
    Candidate.find(function (err, docs) {
         res.json(docs);
    });
});

router.get('/candidates/:id', function(req, res){
    Candidate.find({'_id':req.params.id}, function(err, data){
        res.json(data);
    });
});

router.put('/candidates/:id', function (req, res) {
    console.log(req.body);

    Candidate.findById(req.params.id, function (err, Candidate) {
        Candidate.firstname = req.body.fname;
        Candidate.lastname = req.body.lname;
        Candidate.email = req.body.email;

        Candidate.save(function (err) {
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });

    });
});


module.exports = router;
