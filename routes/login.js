var express = require('express');
var router = express.Router();


var loginDubbo = require('./interface/loginService');


router.get('/', function (req, res) {
    res.render('login');
});
router.post('/', async (req, res, next) => {
    console.info(`[login]:==:> start`)
    var body = req.body;
    var userName = body.username;
    var password = body.password;
    console.log(userName+" "+password)
    const loginResult = await loginDubbo.service.loginService.Login(userName, password);
    console.log(loginResult);
    if (loginResult.res != null) {
        req.session.userName = loginResult.res.userName;
        req.session.password = loginResult.res.password;
        req.session._id = loginResult.res._id;
        res.redirect('blog');
    } else {
        res.render('login', { loginErr: "用户名或密码错误！" });
    }
});
module.exports = router;