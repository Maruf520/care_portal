const Advance = require('../models/Advance');

module.exports = { function(res, AdvanceObj) {
    var updateData = {
        advanceList: AdvanceObj.advanceList,
        modifiedBy: AdvanceObj.modifiedBy,
        totalAdvance: AdvanceObj.totalAdvance

       }
       Advance.findOne({'registrationid':AdvanceObj.registrationid}, updateData,  {upsert:true}, function(err, doc) {
           if(AdvanceObj.onAdmit) {
               if(err) return next(err);
               else {
                   console.log('Successfully updated advance pay on addmission!! ')
               }
           } else{
            if (err)
                res.status(500).send({statusCode: 500, message: "Something went wrong in updating your advance."});                                             
            else
                res.status(200).send({statusCode: 200, message: "Advance updated sucessfully."});
        }  ;
       });
    }

};