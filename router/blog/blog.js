/**
 * 获取网站收藏信息的路由
 */

const express = require('express')
const router = express.Router();
const { addBlog, if_blogTitle, getBlogInfo, getBlogNum, editBlog, editIfRecommend, deleteBlogInfo, deleteMoreBlogInfo, getBlogInfoById } = require('../../controller/blog/blog')
const { getTagNameInfo } = require('../../controller/blog/blogTag')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const getCurrentTime = require('../../util/getCurrentTime')

const getBlogRouterHandle = router.post('/api/blog/addBlog', (req, res) => {
    // 解析 post 请求
    let blog_title = req.body.blog_title;
    let blog_summary = req.body.blog_summary;
    let blog_tag_id = req.body.blog_tag_id;
    let blog_state = req.body.blog_state;
    let blog_content = req.body.blog_content;



    if_blogTitle(blog_title).then(blogInfo => {
        if (blogInfo[0]) {
            const blog_title_yes = new ErrorModel({
                tip: '此博客标题已存在请修改后重试！',
                failTime: getCurrentTime()
            }, "博客添加失败！");
            res.status(201).send(blog_title_yes);
        } else {
            addBlog(blog_title, blog_summary, blog_tag_id, blog_state, blog_content).then(() => {
                const addBlog = new SuccessModel({
                    tip: '博客添加成功~！',
                    createTime: getCurrentTime()
                }, 'ok')
                res.send(addBlog)
            })
        }
    })
})
    .post('/api/blog/getBlogInfo', async (req, res) => {
        const currentPage = req.body.currentPage
        const pageSize = req.body.pageSize
        const blog_title = req.body.blog_title?req.body.blog_title:''
        const blog_tag_id = req.body.blog_tag_id == 'all' ? '' : req.body.blog_tag_id
        const blog_state = req.body.blog_state

        // console.log(blog_title,"title")
        let total = await getBlogNum(blog_title,blog_tag_id,blog_state);
        total = parseInt(total[0]['COUNT(id)'])

        // 获取所有标签
        let tag = await getTagNameInfo(1, 999)
        //    console.log(tag,"===")
        getBlogInfo(currentPage, pageSize, blog_title, blog_tag_id, blog_state).then(relust => {
            relust.map(item => {
                item.tagName = []
                let tagArr = item.blog_tag_id.split(",")
                for (let key in tagArr) {
                    tag.map(tagItem => {
                        if (tagItem.id == tagArr[key]) {
                            item.tagName.push(tagItem.b_tag_name)
                        }
                    })
                }
            })
            const blogInfo = new SuccessModel({
                tip: '博客列表获取成功',
                time: getCurrentTime(),
                data: relust,
                paging: {
                    currentPage: currentPage,
                    pageSize: pageSize,
                    total: total
                }
            }, 'ok')
            res.send(blogInfo)
        })
    }).post('/api/blog/deleteBlogInfo', (req, res) => {
        let id = req.body.id
        deleteBlogInfo(id).then(() => {
            const deleteBlogInfo = new SuccessModel({
                time: getCurrentTime(),
                tip: `以删除id为${id}博客成功`
            }, 'ok')
            res.send(deleteBlogInfo)
        })
    }).post('/api/blog/deleteMoreBlogInfo', (req, res) => {
        let idList = req.body
        deleteMoreBlogInfo(idList).then(() => {
            const deleteMoreBlogInfo = new SuccessModel({
                time: getCurrentTime(),
                tip: `博客删除成功！`
            }, 'ok')
            res.send(deleteMoreBlogInfo)
        })
    }).post('/api/blog/editBlog', (req, res) => {
        let id = req.body.id
        let blog_title = req.body.blog_title;
        let blog_summary = req.body.blog_summary;
        let blog_tag_id = req.body.blog_tag_id;
        let blog_state = req.body.blog_state;
        let blog_content = req.body.blog_content;

        editBlog(id, blog_title, blog_summary, blog_tag_id, blog_state, blog_content).then(() => {
            const editBlogSuccess = new SuccessModel({
                tip: '博客修改成功',
                time: getCurrentTime()
            }, 'OK')
            res.send(editBlogSuccess);
        })

    }).post(`/api/blog/IfRecommend`, (req, res) => {
        const id = req.body.id
        const if_show = req.body.if_show
        editIfRecommend(id, if_show).then(relust => {
            const editShow = new SuccessModel({
                tip: '修改推荐状态成功',
                time: getCurrentTime()
            }, 'ok')
            res.send(editShow)
        })
    }).post('/api/blog/getBlogInfoById', (req, res) => {
        let id = req.body.id
        getBlogInfoById(id).then((relust) => {
            const getBlogInfoById = new SuccessModel({
                time: getCurrentTime(),
                tip: `查询成功`,
                data: relust
            }, 'ok')
            res.send(getBlogInfoById)
        })
    })

module.exports = getBlogRouterHandle