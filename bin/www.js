/**
 * 启动服务入口
 */
const express = require('express')
const bodyParser = require('body-parser')
const { ErrorModel } = require('../model/resModel')
const ejwt = require('express-jwt')
const PONT = '8001'
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const app = express()
// 引入工具类
const util = require('../util/common')
global.$util = util

//配置静态资源文件
app.use('/static',express.static(path.join( __dirname + "/../public")));//将文件设置成静态
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('file'));

// 后端解决跨域导入cors包
const cors = require('cors');
// 解决跨域
	app.use(cors()); 

 // token 秘钥
 const SECRET_KEY = 'qy10280929wyz'

// 配置body-parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
//     });
// 注意使用app.use时是分先后顺序的，先配置跨域，再配置路由，否则跨域无效
//设置跨域访问（设置在所有的请求前面即可）
// app.all("*", function (req, res, next) {
// 	//设置允许跨域的域名，*代表允许任意域名跨域
// 	res.header("Access-Control-Allow-Origin", "*");
// 	//允许的header类型
// 	res.header("Access-Control-Allow-Headers", "content-type");
// 	//跨域允许的请求方式 
// 	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
// 	if (req.method == 'OPTIONS')
// 		res.sendStatus(200); //让options尝试请求快速结束
// 	else
// 		next();
// });

// 配置不需要token的路由
let unlessPath  = [
    '/api/user/login',
    '/fileUpload',
    '/api/blog/getBlogInfo',
    '/api/blog/getBlogInfoById',
    '/api/blogTag/getBlogTagInfo',
    '/api/friendLink/getFriendLinkInfo',
    '/api/info/selectInfoAbout',
    '/api/webCollect/getWebCollectInfo',
    '/api/Interface/oneSentence',
    '/api/Interface/getWbHotspot',
    '/api/Interface/getBlblHotspot',
    '/api/Interface/getZhHotspot',
]

// 配置全局 token 验证
app.use(ejwt({ secret: SECRET_KEY, algorithms: ['HS256']})
.unless({path: unlessPath}))

// 配置全局 token 验证不通过
app.use((err, req, res, next) => {
    console.log(err, req, res, next);
    if(err.name === 'UnauthorizedError') {
        const verify = new ErrorModel({
            tip: '您没有权限，请登录',
            status: 401
        },'fail')
        res.status(401).send(verify)
    }
})

const loginRouterHandle = require('../router/login')
const getUserInfoRouterHandle = require('../router/user/userInfo')
const uploadFileRouterHandle = require('../router/upload/file')
const getQuestionBankRouterHandle = require('../router/question/questionBank')
const getQuestionManageRouterHandle = require('../router/question/questionManage')

// 最新getBlogTagRouterHandle
const getWebCollectRouterHandle = require('../router/single/webCollect')
const getBlogTagRouterHandle = require('../router/blog/blogTag')
const getBlogRouterHandle = require('../router/blog/blog')
const getFriendLinkRouterHandle = require('../router/blog/friendLink')
const getGlyInfoRouterHandle = require('../router/gly/glyInfo')
const getInterfaceRouterHandle = require('../router/single/Interface')


// 破解软件路由
const getCdkRouterHandle = require('../router/cdk')










app.use(loginRouterHandle)
app.use(getQuestionBankRouterHandle)
app.use(getQuestionManageRouterHandle)
app.use(getUserInfoRouterHandle)
app.use(uploadFileRouterHandle)

// 最新
app.use(getWebCollectRouterHandle)
app.use(getBlogTagRouterHandle)
app.use(getBlogRouterHandle)
app.use(getFriendLinkRouterHandle)
app.use(getGlyInfoRouterHandle)
app.use(getInterfaceRouterHandle)

// 破解软件路由
app.use(getCdkRouterHandle)






app.listen(PONT, ()=>{
    console.log('服务启动成功' + '192.168.89.245:' + PONT)
})