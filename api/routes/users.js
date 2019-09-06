var express = require('express');
var router = express.Router();
var users = require('../models/users');
var jwt = require('jwt-simple');
/* GET users listing. */
router.get('/:str', function (req, res, next) {
    users.find({
        $or: [
            {"name": {"$regex": req.params.str, "$options": "i"}},
            {"email": {"$regex": req.params.str, "$options": "i"}}
        ]
    }, {password: false}).then(function (doc) {
        res.send(doc);
    });
});

router.post('/login', function (req, res) {
    var query = users.findOne({email: req.body.email});
    query.then(function (doc) {
        if (doc) {
            doc.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch) {
                    //   var expires = moment().add('days', 7).valueOf();
                    var dateObj = new Date();
                    var expires = dateObj.setDate(dateObj.getDate() + 365);
                    /**
                     * GET JWT TOKEN AND SET EXPIRE DATE
                     * **/
                    var token = jwt.encode({
                        iss: doc._id,
                        exp: expires
                    }, require('../config/secret')());


                    var profile = {
                        "_id": doc._id,
                        "name": doc.name,
                        "email": doc.email
                    };
                    res.send({status: true, data: profile, isMatch: isMatch, token: token});
                }

                if (isMatch === false) {
                    res.send({status: false, msg: 'Invalid login credentials!'});
                }
            });
        } else {
            res.send({status: false, msg: 'Your are not registered yet!. Please complete your registration'});
        }

    }, function (err, doc) {
        res.send({
            status: false, error: err, msg: doc
        });
    });
})
router.post('/registration', function (req, res) {
    var query = users.findOne({'email': req.body.email});
    query.then(function (doc) {
        if (doc) {
            res.send({status: false, msg: 'Your are already registered!'});
        }

        if (doc === null) {
            new users(req.body).save()
                .then(function (doc) {
                    if (doc) {
                        /*upon success*/
                        var dateObj = new Date();
                        var expires = dateObj.setDate(dateObj.getDate() + 365);
                        var token = jwt.encode({
                            iss: doc._id,
                            exp: expires
                        }, require('../config/secret')());

                        var profile = {
                            "_id": doc._id,
                            "name": doc.name,
                            "email": doc.email,
                        };
                        res.send({status: true, data: profile, token: token});
                    }

                }, function (err, doc) {
                    res.send({
                        status: false, msg: err.message, message: doc
                    });
                });
        }
    })
});
module.exports = router;
