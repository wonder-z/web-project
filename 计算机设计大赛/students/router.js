
const Manager = require('./model/manager.js')
const Student = require('./model/student.js');
const Suggestion = require('./model/suggestion.js');
const Leave = require('./model/leave.js');
const Late = require('./model/Late.js');
const Computer = require('./model/Computer.js');
const Repair = require('./model/repair.js');
const Notice = require('./model/notice.js');
var express = require('express');

var user;
var studentNumber;
var managerNumber;
//1，创建一个路由容器
var router = express.Router();

//2，把路由都挂载在路由容器上

//登录页面
router.get('/', function (req, res) {
    res.render('register');
})
router.get('/register', function (req, res) {
    res.render('register');
})


//登陆请求
router.post('/register', function (req, res) {
    if (req.body) {
        user = req.body
        Manager.findOne(user, function (err, data) {
            if (err) {
                return res.status(500).send('密码或用户名错误');
            }
            if (data) {
                managerNumber = user.number;
                res.redirect('/managerIndex')
            } else {
                return res.status(500).send('Server error');
            }
        })
    }
})

//注册
router.get('/login', function (req, res) {
    res.render('login.html');
})

// //注册请求（将用户存入数据库，并登录）
router.post('/loginAndRegister', function (req, res) {
    user = req.body;
    Manager.create(req.body);
    managerNumber = user.number;
    res.writeHead(301,{
    Location: '/managerIndex'
    }); 
    res.end();
})

router.get('/studentLogin', (req,res)=>{
    res.render('studentLogin');
     
}); 



router.post('/studentLogin', async (req,res)=>{

    Student.create(req.body);
    studentNumber = req.body.number;
    res.writeHead(301,{
    Location: '/index'
    }); 
    res.end();
});

router.post('/studentRegister', async (req,res)=>{
    let stu = await Student.findOne({number : req.body.number});
    if(stu.password == req.body.password){
        studentNumber = stu.number;
        res.writeHead(301,{
        Location: '/index'
    });
    res.end();
    }else{  
        res.render('register',{
            warn: '密码错误，请重新输入'
        
        });
    }
});
//报修和意见反馈
router.get('/repair', function (req, res) {
    res.render('repair');
})
router.get('/suggestion', function (req, res) {
    res.render('suggestion');
})

router.post('/repair', function (req, res) {
    let rep = req.body;
    rep.number = studentNumber;
    Repair.create(rep);
    res.writeHead(301,{
    Location: '/showRepair'
    }); 
    res.end();
})
router.get('/managerRepair', async (req,res)=>{
    let repairs = await Repair.find();
    res.render('managerRepair', {     //第二个参数为对象
        repairs: repairs     //数组
    }); 
}); 
router.get('/accept', async (req,res)=>{
    await Repair.updateOne({_id : JSON.parse(req.query.id)}, {isProcess: true});
    let repairs = await Repair.find();
    res.render('managerRepair', {     //第二个参数为对象
        repairs: repairs     //数组
    });
});
//学生
router.get('/showRepair', async (req,res)=>{ 
    let repairs = await Repair.find({number : studentNumber});
    res.render('showRepair', {     //第二个参数为对象
        repairs: repairs     //数组
    }); 
}); 
router.post('/suggestion', function (req, res) {
    let rep = req.body;
    rep.number = studentNumber;
    Suggestion.create(rep);
    res.writeHead(301,{
    Location: '/showSuggestion'
    }); 
    res.end();
}) 
router.get('/managerSuggestion', async (req,res)=>{
    let suggestions = await Suggestion.find();
    res.render('managersuggestion', {     //第二个参数为对象
        suggestions: suggestions     //数组
    }); 
}); 
router.get('/acceptSuggestion', async (req,res)=>{
    await Suggestion.updateOne({_id : JSON.parse(req.query.id)}, {isProcess: true});
    let suggestions = await Suggestion.find();
    res.render('managerSuggestion', {     //第二个参数为对象
        suggestions: suggestions     //数组
    });
});
router.get('/showSuggestion', async (req,res)=>{ 
    let suggestions = await Suggestion.find({number : studentNumber});
    res.render('showsuggestion', {     //第二个参数为对象
        suggestions: suggestions     //数组
    }); 
}); 


//展示离校信息的页面
router.get('/leave', function (req, res) {
    Leave.find(function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('leave', {
            leaves: data
        })
    })
})

//新建离校信息的页面
router.get('/newLeave', function (req, res) {
    res.render('newLeave');
})

//新建离校信息登记，发送的新建信息
router.post('/giveNewLeave', function (req, res) {
    new Leave(req.body).save(function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }
        Leave.find(function (err, data) {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.render('leave', {
                leaves: data
            })
        })

    })
})


//删除离校信息
router.get('/delLeave', function (req, res) {
    Leave.findOneAndDelete({ _id: req.query._id.replace(/"/g, '') }, function (err, ret) {
        if (err) {
            return res.status(500).send('Server error...无法删除信息');
        }
        res.redirect('/leave')
    })
})






//带电脑登记。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
//展示登记信息的页面
router.get('/computer', function (req, res) {
    Computer.find(function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('computer', {
            computers: data
        })
    })
})

//新建电脑信息的页面
router.get('/newCom', function (req, res) {
    res.render('newCom');
})

//新建电脑信息登记，发送的新建信息
router.post('/giveNewCom', function (req, res) {
    new Computer(req.body).save(function (err, data) {
        if (err) {
            console.log('保存失败');
            return res.status(500).send('Server');
        }
        Computer.find(function (err, data) {
            if (err) {
                console.log('重定向失败');
                return res.status(500).send('Server error');
            }
            res.render('computer', {
                computers: data
            })
        })
    })
})
//删除带电脑登记信息
router.get('/delCom', function (req, res) {
    Computer.findOneAndDelete({ _id: req.query._id.replace(/"/g, '') }, function (err, ret) {
        if (err) {
            return res.status(500).send('Server error...无法删除信息');
        }
        res.redirect('/computer')
    })
})






//晚归登记。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
//展示晚归信息的页面
router.get('/late', function (req, res) {
    Late.find(function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('late', {
            lates: data
        })
    })
})

//新建晚归信息的页面
router.get('/newLate', function (req, res) {
    res.render('newLate');
})

//新建晚归信息登记，发送的新建信息
router.post('/giveNewLate', function (req, res) {
    new Late(req.body).save(function (err, data) {
        if (err) {
            return res.status(500).send('Server error');
        }
        Late.find(function (err, data) {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.render('late', {
                lates: data
            })
        })

    })
})

//删除晚归信息
router.get('/delLate', function (req, res) {
    Late.findOneAndDelete({ _id: req.query._id.replace(/"/g, '') }, function (err, ret) {
        if (err) {
            return res.status(500).send('Server error...无法删除信息');
        }
        res.redirect('/late')
    })
})


//学生----------------
//学生展示主页
router.get('/stuIndex', function (req, res) {
    res.render('stuIndex')
})

//学生展示晚归信息
router.get('/stuLate', async function (req, res) {
    let lates = await Late.find({number : studentNumber});
    res.render('stuLate', {     //第二个参数为对象
        lates: lates     //数组
    }); 

})
//学生展示离校信息

router.get('/stuLeave', async function (req, res) {
    let leaves = await Leave.find({number : studentNumber});
    res.render('stuLeave', {     //第二个参数为对象
        leaves: leaves     //数组
    }); 

})
//学生展示带电脑登记信息

router.get('/stuCom', async function (req, res) {
    let computers = await Computer.find({number : studentNumber});
    res.render('stuCom', {     //第二个参数为对象
        computers: computers    //数组
    }); 

})


//信息和公告
router.get('/informationBuy', function (req, res) {
    res.render('informationBuy');
})

router.get('/managerInformationBuy', function (req, res) {
    res.render('managerInformationBuy');
})
//管理员首页
router.get('/managerIndex', async function (req, res) {
    let man = await Manager.findOne({number : managerNumber});
    let managerName = man.name;
    let notices = await Notice.find();
    res.render('managerIndex', {
        managerName: managerName,
        notices: notices
    });
    
})
router.get('/giveNotice', function (req, res) {
    res.render('giveNotice');
})
router.post('/notice', function (req, res) {
    Notice.create(req.body);
    res.writeHead(301,{
        Location: '/managerIndex'
    }); 
    res.end();
})
router.get('/noticeFix', async function (req, res) {
    let not = await Notice.findOne({_id : JSON.parse(req.query.id)});
    res.render('noticeFix',{
        not : not
    }); 
})
router.post('/noticeFix', async (req,res)=>{
    await Notice.updateOne({_id : JSON.parse(req.query.id)}, req.body);
    res.writeHead(301,{
        Location: '/managerIndex'
    });
    res.end();   
});
//学生主页
router.get('/index', async (req,res)=>{
    let stu = await Student.findOne({number : studentNumber});
    let studentName = stu.name;
    let notices = await Notice.find();
    res.render('index', {
        studentName: studentName,
        notices : notices 
    });
    
});

//学生信息管理
router.get('/studentInformation', async function (req, res) {
    let students = await Student.find();
    res.render('studentInformation', {     //第二个参数为对象
        students: students     //数组
    }); 
})

//添加学生信息
router.get('/studentInformationAdd', function (req, res) {
    res.render('studentInformationAdd');
})


router.post('/information', function (req, res) {
    Student.create(req.body);
    res.writeHead(301,{
    Location: '/studentInformation'
    }); 
    res.end();
})

router.post('/information', function (req, res) {
    Student.create(req.body);
    res.writeHead(301,{
    Location: '/studentInformation'
    }); 
    res.end();
})

//修改学生信息
router.get('/amend', async (req,res)=>{
    let stu = await Student.findOne({_id : JSON.parse(req.query.id)});
    res.render('studentInformationAmend',{
        stu:stu
    }); 
});

router.post('/amend', async (req,res)=>{
    await Student.updateOne({_id : JSON.parse(req.query.id)}, req.body);
    res.writeHead(301,{
        Location: '/studentInformation'
    });
    res.end();   
});

//删除学生信息
router.get('/remove', async (req,res)=>{
    await Student.findOneAndDelete({_id : JSON.parse(req.query.id)});
    res.writeHead(301,{
        Location: '/studentInformation'
    });
    res.end();
}); 
//3,把router导出
module.exports = router; 
