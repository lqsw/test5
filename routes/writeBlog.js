var express = require('express');
var router = express.Router();

var blogDubbo = require("./interface/blogService")

router.get('/', function (req, res, next) {
    res.render('writeBlog');
});

router.post('/', async (req, res, next) => {
    console.log(`[writeBlog]:==:> start`);
    var body = req.body;
    var inputTitle = body.inputTitle;
    var inputContent = body.inputContent;
    var author_id = req.session._id;
    var result = await blogDubbo.service.blogService.writeBlog(inputTitle, inputContent,author_id);
    res.json(result);
})

module.exports = router
