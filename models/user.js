const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({ 
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: { 
        type: String,
        required: true
    },
    isBlocked: {
        type:Boolean,
        required: false
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function(username, password, callback){
    User.findOne({username: username})
    .exec(function (err,user){
        if(err){
            return callback(err)
        }
        else if(!user){
            const err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password,user.password, function(err,result){
            if(result === true && !user.isBlocked) {
                return callback(null,user);

            }
            else {
                return callback();
            }
        });

    })
};

UserSchema.pre('save',function(next){
    const user = this;
    bcrypt.hash(user.password,10,function(err,hash){
        if(err) {
            return  next(err);
        }
        user.password = hash;
        bcrypt.hash(user.passwordConf, 10, function (err, hash){
            if (err) {
                return next(err);
            }
            user.passwordConf = hash;
            next();
        });
        
    });
});



var User = mongoose.model('User', UserSchema);
module.exports = User;