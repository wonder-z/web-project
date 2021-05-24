const mongoose = require('mongoose');
const managerSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['0', '1'],
        default: '0'
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

//直接导出模型构造函数
module.exports = mongoose.model('Managers', managerSchema);

