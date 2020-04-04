const patient = require('../models/patient');

module.exports = function(patientObj) {
    new patient({ 
        registrationid: patientObj.registrationid,
        registrationDate: patientObj.registrationDate,
        patientName: patientObj.patientName,
        underDoctor: patientObj.underDoctor,
        sufferingFrom: patientObj.sufferingFrom,
        sex: patientObj.sex,
        age: patientObj.age,
        VoterId: patientObj.VoterId,
        admissionType: patientObj.admissionType,
        paymentType: patientObj.paymentType,
        village: patientObj.village,
        postOffice: patientObj.postOffice,
        policeStation: patientObj.policeStation,
        district: patientObj.district,
        state: patientObj.state,
        primaryPhoneNo: patientObj.primaryPhoneNo,
        primaryPhoneNnumber: patientObj.primaryPhoneNnumber,
        email: patientObj.email
    }).save(function(err, result){

        if(err) throw err;
        if(result){
            console.log("Successfully Inserted");
        };
    });
    return 'success';
};