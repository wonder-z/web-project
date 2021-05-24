const mongoose = require('mongoose')
const noticeSchema = new mongoose.Schema({
    text: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
})
const Notice = mongoose.model('Notice', noticeSchema);
//直接导出模型构造函数
module.exports = mongoose.model('Notice', noticeSchema)
