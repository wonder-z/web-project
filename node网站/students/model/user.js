const mongoose = require('mongoose');
//创建学生集合规则

const userSchema = new mongoose.Schema({
    studentId: {
        type: String,
        // required: true,  //必传字段
        minlength: 8,
        maxlength: 8
    },
    password: {
        type: String,
        required: true,  //必传字段
        minlength: 6,
        maxlength: 16
    },
});


const User = mongoose.model('User', userSchema);
//导出
module.exports = User;