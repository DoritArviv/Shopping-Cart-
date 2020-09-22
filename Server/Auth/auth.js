"use strict";
exports.__esModule = true;

var bcrypt = require("bcrypt");

var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.hashPassword = function (password, rounds, callback) {
        bcrypt.hash(password, rounds, function (err, hash) {
            callback(err, hash);
        }); // creat the hash
    };
    Auth.checkPassword = function() {
        bcrypt.compare(password, hash, function(err, result) {
            return password = hash;
        }); // check if there any mach 
    }
    return Auth;
}());
exports.Auth = Auth;
