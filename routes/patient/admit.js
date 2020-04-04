const patient =  require('../../models/patient');
const Advance = require('../../models/Advance');
const logger = require('../../config/logger');
const addAdvance = require('../../seed/addAdvance');
const updatePatient = require('../../seed/updatePatient');

module.exports = {
    get:function(req,res,next) {
       var regId = req.query.regid;;
        logger.debug(regId);
        logger.debug('fskfsanfkjn');
        if(regId)
        {
            patient.findOne({'registrationid': regId}, function(err, docs) {
                if(err) return next(err);
                if(docs) {
                    console.log(docs)
                    if(!docs.admitDate) {
                        var datetime = new Date().toLocaleString();
                        docs.admitDate = datetime;
                    }const pattobj = docs;
                    logger.info("hjhhhhhhhhhhhhhhhhhhhhhh"+pattobj);
                    var registrationid = docs.registrationid;
                    var ddd = {
                        registrationid:docs.registrationid,
                        isAdmitted:docs.isAdmitted,
                        admitDate:docs.admitDate,
                        patientName:docs.patientName,
                        underDoctor: docs.underDoctor,
                        sufferingFrom:  docs.sufferingFrom,
                        sex: docs.sex,
                        age: docs.age,
                        VoterId: docs.VoterId,
                        guardianName: docs.guardianName,
                        realationWithGuardian: docs.realationWithGuardian,
                        whoBoughtPatient: docs.whoBoughtPatient,
                        relationWithPatient: docs.relationWithPatient,
                        VoterId: docs.VoterId,
                        paymentType: docs.paymentType,
                        village: docs.village,
                        postOffice: docs.postOffice,
                        policeStation: docs.policeStation,
                        district: docs.district,
                        state: docs.state,
                        primaryPhoneNo: docs.primaryPhoneNnumber,
                        secondaryPhoneNo: docs.secondaryPhoneNo,
                        email: docs.email,



                    } 
                    res.render('admission',{title: "Admiossion",patientObj:ddd, loggedInUser: global.loggedInUser});
                }else 
                {
                    res.render('failure',{title:"something wrong!!", message: "Registration id is not valid", loggedInUser: global.loggedInUser })
                }
            });
        }else {

            res.render('userinput', { title: "Fill Details", pageToRedirect: "admit", message: "Please provide registration id below", btnName: "Proceed To Patient Admit", localRegId: localStorage.getItem('localRegId'), loggedInUser: global.loggedInUser });
        }
    },


    post:function(req,res,next) {
        const registrationid = req.body.regId;
        console.log("Post registration"+registrationid)
        patient.findOne({"registrationid": registrationid},function(err,docs) {
            if(err) return next(err);
            console.log("Baler : "+registrationid)
            if(docs.isAdmitted) {
                res.render('success',{title:'Operation success', message: "patient admitted already", printbtn: "Print Admission Form", print: "true", loggedInUser: global.loggedInUser})
            }else {
                console.log('alchal')
                 patientObj = {
                    regId: registrationid,
                    admitDate: req.body.admitDate,
                    patientName: req.body.patientname,
                    underDoctor: req.body.underdoc,
                    sufferingFrom: req.body.sufferfrom,
                    sex: req.body.sex,
                    age: req.body.age,
                    aadharVoterId: req.body.aadhar,
                    admissionType: req.body.admissionType,
                    paymentType: req.body.paymentType,
                    village: req.body.village,
                    postOffice: req.body.po,
                    policeStation: req.body.ps,
                    district: req.body.dist,
                    state: req.body.state,
                    primaryPhoneNo: req.body.pphone,
                    secondaryPhoneNo: req.body.sphone,
                    email: req.body.email,
                    guardianName: req.body.guardianName,
                    realationWithGuardian: req.body.relWithGuardian,
                    whoBoughtPatient: req.body.whoBought,
                    relationWithPatient: req.body.relWhoBought,
                    packageOffered: req.body.packageOffered
                },
                updateData = {
                    admitDate: req.body.admitDate,
                    guardianName: req.body.guardianName,
                    realationWithGuardian: req.body.relWithGuardian,
                    whoBoughtPatient: req.body.whoBought,
                    relationWithPatient: req.body.relWhoBought,
                    advanceAmount: req.body.advance,
                    isAdmitted: true,
                    modifiedBy: global.loggedInUser,
                    referer: req.body.referer,
                    refererPhone: req.body.refererPhone,
                    refererAmount: req.body.refererAmount
                },
                result =  updatePatient(updateData, {registrationid: registrationid})
                if(result === 'success') 
                console.log('success hoiseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
                if(updateData.advanceAmount) {
                    Advance.findOne({'registrationid':registrationid}, function(err, advanceDoc) {
                        if(err) return next(err);
                        var newAdvanceList = {
                            advance: 'Advance paid at time of addmission',
                            date: new Date().toLocaleString(),
                            advanceAmount : updateData.advanceAmount
                        }  
                            if(advanceDoc) {
                                advanceDoc.advanceList.push(newAdvanceList),
                                advanceDoc.totalAdvance = Number(advanceDoc.totalAdvance) + Number(advanceDoc.advanceAmount),
                                advanceDoc.onAdmit = true,
                                advanceDoc.regId  = advanceDoc.registrationid
                                updateAdvance(res, advanceDoc);
                            }else {
                                var obj = { 
                                    regId: registrationid,
                                    advanceList:[newAdvanceList],
                                    modifiedBy:global.loggedInUser,
                                    totalAdvance:updateData.advanceAmount,
                                    onAdmit: true

                                }
                                addAdvance(res, obj);
                            }
                        
                    });
                    res.render('success', { title: "Operation Success", page: 'admission', message: "Patient admission successfull.", printbtn: "Print Admission Form", print: "true", patientObj: patientObj, loggedInUser: global.loggedInUser });
                } else
                res.render('failure', { title: "Something Wrong!", message: "Admission Unsuccessfull", loggedInUser: global.loggedInUser });
            }

        });
    

}};
