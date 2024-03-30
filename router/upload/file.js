const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
const getCurrentTime = require('../../util/getCurrentTime')
const {SuccessModel, ErrorModel} = require('../../model/resModel')
let response = {}

// 头像上传
const uploadFileRouterHandle =  router.post('/fileUpload',(req,resUpload)=>{
    var fileUrl =path.resolve( __dirname + "../../../public/" + req.files[0].originalname); //文件名
    fs.readFile(req.files[0].path,(err,res)=>{
        fs.writeFile(fileUrl, res,(err=> { //文件写入 
            if( err ){
                console.log( err );
            }else{
                  // 文件上传成功，respones给客户端
               response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
                };
                const fileUrl = new SuccessModel({
                    tip: '图片上传成功！',
                    uploadTime: getCurrentTime(),
                    pic:'/static/'+response.filename
                },'ok')
                resUpload.send(fileUrl)
            }
        }))
        
    })
})

module.exports = uploadFileRouterHandle;
