var express = require('express');
var router = express.Router();
var URL = require('url');

var blogDubbo = require('./interface/blogService');

router.get('/', async (req, res) => {
    console.info(`[readBlog]:==:> start`)
    var _id = URL.parse(req.url, true).query._id;
    const result = await blogDubbo.service.blogService.readBlog(_id);
    res.json(result.res);
    // res.render("readBlog",
    //     {
    //         title: result.res.title,
    //         content: result.res.content,
    //         author: result.res.author_id,
    //         _id: result.res._id,
    //         time: result.res.date
    //     });
});

router.post('/', async (req, res) => {
    var body = req.body;
    var _id = body._id;
    var inputTitle = body.inputTitle;
    var inputContent = body.inputContent;
    var author_id = req.session._id;
    var result = await blogDubbo.service.blogService.editBlog(_id, inputTitle, inputContent,author_id);
    res.json(result);
});

module.exports = router;
