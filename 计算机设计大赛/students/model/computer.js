const mongoose = require('mongoose')
const computerSchema = new mongoose.Schema({
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
const Computer = mongoose.model('Computer', computerSchema);
//直接导出模型构造函数
module.exports = mongoose.model('Computer', computerSchema)
