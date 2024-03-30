/**
 * 登录和注册的路由
 */

const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { getUsers, login, if_oldPwd, editPwd } = require('../controller/login')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const getCurrentTime = require('../util/getCurrentTime')

const loginRouterHandle = router.post("/api/user/login",(req,res)=>{
    let user_name = req.body.username
    let password = req.body.password
    let remember_login = req.body.remember_login
    // token 秘钥
    const SECRET_KEY = 'qy10280929wyz'
    login(user_name, password).then(sqlData => {
        const user_id = sqlData[0].id
        // const role_type = sqlData[0].role_type
        if(sqlData.length > 0){
            // jwt 生成token
            const token = jwt.sign({user_id,user_name},SECRET_KEY,{
                expiresIn:remember_login?"168h":"24h"
            })
            const loginSuccess = new SuccessModel({
                tip: '登录成功',
                user_name,
                token,
                loginTime: getCurrentTime()
            },'ok')
            res.send(loginSuccess)
        }else {
            const loginFail = new ErrorModel({
                tip: '登录失败',
                failTime: getCurrentTime()
            },'fail')
            res.status(400).send(loginFail)
        }
    }).catch((err) => {
        const loginFail = new ErrorModel({
            tip: '账号密码错误，登录失败',
            failTime: getCurrentTime()
        },'fail')
        res.status(400).send(loginFail)
    })
}) .post('/api/user/editPwd',(req, res) => {
    let user_name = req.body.user_name;
    let oldPwd = req.body.oldPwd;
    let user_password = req.body.user_password
    if_oldPwd(user_name,oldPwd).then(sqlData=> {
        if(!sqlData[0]){
            const old_pwd_no = new ErrorModel({
                tip: '旧密码错误,请从新输入后重试!',
                failTime: getCurrentTime()
            },"旧密码错误,请从新输入后重试!");
            res.status(201).send(old_pwd_no);
        }else{
            editPwd(user_name, user_password).then( () => {
                const editPwd = new SuccessModel({
                    tip: '修改密码成功~！',
                    createTime: getCurrentTime()
                },'ok')
                res.send(editPwd)
            })
        }
    })
})
// 登录验证 
.get('/api/user/checkLogin', (req, res) => {
    const valiLogin = new SuccessModel({
        tip:'登录验证',
        checkTime: getCurrentTime(),
        user_id: req.user.user_id,
        user_name: req.user.user_name
    },'ok')
    res.send(valiLogin)
})

module.exports = loginRouterHandle;