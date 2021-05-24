const mongoose = require('mongoose')
const leaveSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,  //必传字段
        minlength: 2,
        maxlength: 10
    },
    room: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
})
const Leave = mongoose.model('Leave', leaveSchema);
//直接导出模型构造函数
module.exports = mongoose.model('Leave', leaveSchema)
