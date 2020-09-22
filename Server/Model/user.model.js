const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const Auth = require('../Auth/auth');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true },
    password: {type: String, required: true },
    email: {type:String, unique: true, lowercase: true, trim: true}
});
userSchema.pre('save', function(next) { //before saving do that:

    Auth.Auth.hashPassword(this.password, 10, (err, hash)=>{ //hashing the password
        if (err) next(err);
        this.password = hash;
        next();
    })
});

userSchema.set('toJSON', { // then transfer the hashing to JSON
        transform: (doc, ret) => {delete ret.password;
        return ret;
    }
});

const User = new mongoose.model('User', userSchema);
module.exports = User;