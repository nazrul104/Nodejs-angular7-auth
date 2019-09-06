var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;
/**
 *  user_role
 *  ---------
 *  1) SUPER ADMIN = 0 (ALL RESTAURANTS)
 *  2) ADMIN = 1 (RESTAURANT OWNER)
 *  3) ADMIN USER = 2 ( ASSIGNED PERSON BY RESTAURANT)
 *  4) CUSTOMER = 3
 *
 **/

var users = new Schema({
    name: {type: String, required: true},
    email: {type: String},
    password: String,
    created_date: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

users.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


users.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('users', users);


