const patient = require('../models/patient');

module.exports =  function(updateData , query) {
    console.log(query);
    patient.findOneAndUpdate(query, updateData, {upsert:true}, function(err, doc) {
        if (err) return res.send(500, { error: err });
        console.log('sucessfullt updated'+ query.registrationid);
    });
    return 'success'
};