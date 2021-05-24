const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,  //必传字段
        minlength: 8,
        maxlength: 8
    },
    name: {
        type: String,
        required: true,  //必传字段
        minlength: 2,
        maxlength: 10
    },
    sex: {
        type: String,
    },
    age: {
        type: Number,
        min: 10,
        max: 30
    },
    class: String,
    room: String,
    phone: String,
    password: {
        type: String,
        // required: true,  //必传字段
        default: '123456',
        minlength: 6,
        maxlength: 16
    }
    
    
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;