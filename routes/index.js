const express = require('express');
const User = require('../models/user');
const router = express.Router(),


signUpRouter = require('./user/signup');
logInRoute = require('./user/login');
logoutRouter = require('../routes/user/logout');
registerRoute = require('./patient/register'),
userdetailsRote = require('./patient/patientDetails');
admitRout = require('../routes/patient/admit');

router.get('/', logInRoute.get);
router.post('/', logInRoute.post);
// Comment below two lines if you want to disable new registration.
router.post('/signup', signUpRouter.post);
router.get('/signup', signUpRouter.get);

//server side local storage
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function validSession(req,res,next) {
    if(req.session && req.session.userId) {
        User.findById(req.session.userId)
            .exec(function(error,user) {
                if(error) {
                    return next(error);
                }else 
                {
                    if(user == null) {
                        var err = new Error('Not Authorized! Go back!');
                        err.status = 400;
                        return next(err);
                    }else {
                        global.loggedInUser = user.username;
                        next();
                    }
                }
            });

    }else {
        res.render('failure',{title:"Something Wrong",message: "Not Authorized"});
    }
}

/* GET home page. */
router.get('/index', validSession, function(req, res, next) {
    res.render('index', { title: "Welcome to Care Portal", loggedInUser: global.loggedInUser });
});
router.get('/logout',logoutRouter.get);
router.get('/register',registerRoute.get);
router.post('/register',registerRoute.post);
router.get('/patientdetails',userdetailsRote.get);
router.get('/admit',admitRout.get);
router.post('/admit',admitRout.post);

module.exports = router;


