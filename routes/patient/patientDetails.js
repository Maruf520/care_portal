const patient = require('../../models/patient');

module.exports = {
    get: function(req,res,next) {
        const regId = req.query.regid;
        console.log('detailsSSSSSSSSSSSSSS'+regId)
        if(regId){
            patient.findOne({'registrationid': regId}, function(err, docs) {
                if(err) return next(err);
                if(docs) {
                    res.render('patientdetails', {title:'patient details',patientObj: docs})
                }else {
                    res.render(('failure', { title: "Something Wrong!", message: "Registration id is not valid", loggedInUser: global.loggedInUser }));
                }
            });
        } else {
            res.render('userinput', { title: "Fill Details", pageToRedirect: "patientdetails", message: "Please provide registration id below", btnName: "Get Patient Details", localRegId: localStorage.getItem('localRegId'), loggedInUser: global.loggedInUser });
        }
    }
}