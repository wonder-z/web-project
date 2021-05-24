const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    studentId: {
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
    college: String,
    class: String,
    sex: {
        type: String,
    },
    age: {
        type: Number,
        min: 10,
        max: 30
    }
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;