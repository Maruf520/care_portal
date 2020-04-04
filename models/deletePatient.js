const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    registrationid: {
        type: String,
        requried:true,
        unique: true
    },
    patientName: {
        type: String,
        required: true
    },
    deleteDate: {
        type: String,
        unique: true
    }

});
module.exports = mongoose.model('DeletePatient', schema);