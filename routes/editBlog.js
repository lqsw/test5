var express = require('express');
var router = express.Router();

var blogDubbo = require("./interface/blogService")

router.post('/', async (req, res) => {
    var body = req.body;
    var _id = body._id;
    var inputTitle = body.inputTitle;
    var inputContent = body.inputContent;
    var author_id = req.session._id;
    var result = await blogDubbo.service.blogService.editBlog(_id, inputTitle, inputContent,author_id);
    res.json(result);
});

module.exports = router
