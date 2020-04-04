const router = require('express').Router();
const User = require('../models/user');
router.get('/save',function(req,res){
    res.render('ab.hbs');
})
router.post('/save-data',function(req,res,next) {
    console.log(req.body.username);
    const user = new User ({
        name : req.body.name,
        username: req.body.username,
       
    });
     try {
           user.save();
         return res.send(userr._id);

     }
     catch(err)
     {
            res.status(400).send(err);
     }
});
module.exports=router;