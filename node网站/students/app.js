const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const querystring = require('querystring');

require('./model/connect.js');
const User = require('./model/user.js');
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

app.get('/login', (req,res)=>{
    res.render('login');
    
});

app.get('/enter', (req,res)=>{
    res.render('enter');
    
});
app.get('/', (req,res)=>{
    res.render('enter');
    
});

//学生档案信息页面 
app.get('/add', (req,res)=>{
    res.render('add');
    
});

//展示学生信息
app.get('/list', async (req,res)=>{
    let students = await Student.find();
    res.render('list', {     //第二个参数为对象
        students: students     //数组
    }); 
}); 
app.get('/amend', async (req,res)=>{
    let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
    res.render('amend',{
        stu:stu
    }); 
});
app.get('/search', (req,res)=>{
    res.render('search');
    
});
app.get('/searchList', (req,res)=>{
    res.render('searchList');
    
});

app.get('/amend', async (req,res)=>{
    let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
    res.render('amend',{
        stu:stu
    }); 
});
app.get('/searchAmend', async (req,res)=>{
    let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
    res.render('amend',{
        stu:stu
    });
});
app.get('/remove', async (req,res)=>{
    await Student.findOneAndDelete({_id : JSON.parse(req.query.id)});
    res.writeHead(301,{
        Location: '/list'
    });
    res.end();
}); 

app.get('/searchRemove', async (req,res)=>{
    await Student.findOneAndDelete({_id : JSON.parse(req.query.id)});
    res.writeHead(301,{
        Location: '/searchList'
    });
    res.end();
}); 




app.post('/add', async (req,res)=>{
    let stu = await Student.findOne({studentId : req.body.studentId});
    console.log(req.body);
    if(req.body.studentId == '')
    {
        res.render('addad',{
            student: req.body,
            warn: '学号不能为空'
           
        });
    }
    else if(req.body.name == '')
    {
        res.render('addad',{
            student: req.body,
            warn: '姓名不能为空'
           
        });
    }
    else{
        if(stu == null){
            Student.create(req.body);
            res.writeHead(301,{
            Location: '/list'
            });
            res.end();
        }else{
            res.render('addad',{
                student: req.body,
                warn: '学号已存在，请重新输入'
            
            });
        }  
    }
    
});
app.post('/amend', async (req,res)=>{
    await Student.updateOne({_id : JSON.parse(req.query.id)}, req.body);
    res.writeHead(301,{
        Location: '/list'
    });
    res.end();   
});

app.post('/search', async (req,res)=>{
    let stu = {};
    for(let key of Object.keys(req.body)) {
        if(req.body[key] != ''){
            stu[key] = req.body[key];
        }
    }
    let students = await Student.find(stu);
    res.render('searchList', {     //第二个参数为对象
        students: students     //数组
    }); 
    // res.writeHead(301,{
    //     Location: '/list'
    // });
    // res.end(); 
});

app.post('/login', async (req,res)=>{
    if(req.body.studentId == ''){
        res.render('login',{
            warn: '学号不能为空'
           
        });
    }
    else if(req.body.password == ''){
        res.render('login',{
            warn: '密码不能为空'
           
        });
    }
    else if(req.body.confirm == ''){
        res.render('login',{
            warn: '确认密码不能为空'
           
        });
    }
    else if(req.body.password != req.body.confirm){
        res.render('login',{
            warn: '两次密码不同，请重新输入密码'
           
        });
    }
    else{
        let stu = await User.findOne({studentId : req.body.studentId});
        if(stu == null){
            let use = {};
            use.studentId = req.body.studentId;
            use.password = req.body.password;
            User.create(use);
            res.writeHead(301,{
                Location: '/enter'
            });
            res.end();
        }else{
            res.render('login',{
                warn: '学号已注册，请重新输入'
            
            });
        }
    }
    
});

app.post('/enter', async (req,res)=>{
    let stu = await User.findOne({studentId : req.body.studentId});
    if(stu == null){
        res.render('enter',{
            warn: '该账号不存在，请注册'
        });
    }
    else{
        if(stu.password == req.body.password){
            res.writeHead(301,{
            Location: '/add'
        });
        res.end();
        }else{
            res.render('enter',{
                warn: '密码错误，请重新输入'
            
            });
        }
    }
});

//监听端口
app.listen(80); 
console.log('网站服务器启动成功');