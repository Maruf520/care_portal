const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    registrationid: {
        type: String,
        required: true,
        unique: true
    },
    registrationDate: {
        type: String,
        required: false
    },
    admitDate: {
        type: String,
        required: false
    },
    dischargeDate: {
        type: String,
        required: false
    },
    patientName: {
        type: String,
        required: true
    },
    underDoctor: {
        type: String,
        required: true
    },
    sufferingFrom: {
        type: String,
        required: true
    },
    management: {
        type: String,
        required: false
    },
    sex: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
    },
    gurdianName: {
        type: String,
        required: false
    },
    relationWithGuardian: {
        type: String,
        required: false
    },
    whoBoughtPatient: {
        type: String,
        required: false
    },
    VoterId: {
        type: String,
        required: true
    },
    admissionType: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    postOffice: {
        type: String,
        required: true
    },
    policeStation: {
        type: String,
        required: false
    },

    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    primaryPhoneNnumber: {
        type: String,
        required: true
    },
    secondaryPhoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    isAdmitted: {
        type: Boolean,
        required: false
    },
    isDischared: {
        type: Boolean,
        required: false
    },
    advanceAmount: {
        type: String,
        required: false
    },
    packagetextarea: {
        type: String,
        required: false
    },
    modifiedBy: {
        type: String,
        required: false
    },
    dischargedBy: {
        type: String,
        required: false
    },
    referr: {
        type: String,
        required: false
    },
    refererPhone: {
        type: String,
        required: false
    },
    refererAmount: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Patient', schema);