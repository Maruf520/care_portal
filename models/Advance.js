const mongoose = require('mongoose');
const schema = mongoose.Schema;


const Schema  = new schema({
    registrationid : {
        type: String,
        required: true,
        unique: true
    },
    advanceList : {
        type: Array,
        required: true,

    },
    totalAdvance: {
        type: String,
        required: true
    },
    modifiedBy: {
        type:String,
        required: false
    }
});

module.exports = mongoose.model('Advance',Schema);
