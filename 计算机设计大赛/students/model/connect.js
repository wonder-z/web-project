//连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dormManager', { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(()=>{console.log('数据库连接成功')})
    .catch(()=>{console.log(err, '数据库连接失败')})
