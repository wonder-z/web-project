const mongoose = require('mongoose');
const moment = require('moment');
const repairSchema = new mongoose.Schema({
    text: {
        type: String
    },
    date: {
        type: String,
        default: moment(Date.now()).format('YYYY-MM-DD')
    },
    time: {
        type: String,
        default: moment(Date.now()).format('HH:mm')
    },
    isProcess: {
        type: Boolean,
        default: false
    },
    number: {
        type: String,
        // required: true,  //必传字段
        minlength: 8,
        maxlength: 8
    },
    name: String,
    room: String
});
const Repair = mongoose.model('Repair', repairSchema);
module.exports = Repair;