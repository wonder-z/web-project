const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const moment = require('moment');
require('./model/connect.js');

const Student = require('./model/student.js');
//创建网站服务器
const app = express();
//静态资源访问  
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:false}))
// 模板  
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// 把路由挂载到app服务器中
var router = require('./router');
const { template } = require('express-art-template');
app.use(router) ;
moment().subtract(10, 'days').calendar(); // 2021/03/26
// //展示学生信息
// app.get('/list', async (req,res)=>{
//     let students = await Student.find();
//     res.render('list', {     //第二个参数为对象
//         students: students     //数组
//     }); 
// }); 
// app.get('/amend', async (req,res)=>{
//     let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
//     res.render('amend',{
//         stu:stu
//     }); 
// });
// app.get('/search', (req,res)=>{
//     res.render('search');
    
// });
// app.get('/searchList', (req,res)=>{
//     res.render('searchList');
    
// });

// app.get('/amend', async (req,res)=>{
//     let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
//     res.render('amend',{
//         stu:stu
//     }); 
// });
// app.get('/searchAmend', async (req,res)=>{
//     let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
//     res.render('amend',{
//         stu:stu
//     });
// });
// app.get('/remove', async (req,res)=>{
//     await Student.findOneAndDelete({_id : JSON.parse(req.query.id)});
//     res.writeHead(301,{
//         Location: '/list'
//     });
//     res.end();
// }); 

// app.get('/searchRemove', async (req,res)=>{
//     await Student.findOneAndDelete({_id : JSON.parse(req.query.id)});
//     res.writeHead(301,{
//         Location: '/searchList'
//     });
//     res.end();
// }); 





// app.post('/search', async (req,res)=>{
//     let stu = {};
//     for(let key of Object.keys(req.body)) {
//         if(req.body[key] != ''){
//             stu[key] = req.body[key];
//         }
//     }
//     let students = await Student.find(stu);
//     res.render('searchList', {     //第二个参数为对象
//         students: students     //数组
//     }); 
//     // res.writeHead(301,{
//     //     Location: '/list'
//     // });
//     // res.end(); 
// });


// app.post('/enter', async (req,res)=>{
//     let stu = await User.findOne({studentId : req.body.studentId});
//     if(stu == null){
//         res.render('enter',{
//             warn: '该账号不存在，请注册'
//         });
//     }
//     else{
//         if(stu.password == req.body.password){
//             res.writeHead(301,{
//             Location: '/add'
//         });
//         res.end();
//         }else{
//             res.render('enter',{
//                 warn: '密码错误，请重新输入'
            
//             });
//         }
//     }
// });

//监听端口
app.listen(80); 
console.log('网站服务器启动成功');