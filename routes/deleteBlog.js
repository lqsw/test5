var express = require('express');
var router = express.Router();

var blogDubbo = require("./interface/blogService")

router.post('/', async (req, res) => {
    console.info(`[deleteBlog]:==:> start`)
    var body = req.body;
    var _id = body._id;
    console.log(req)
    const result = await blogDubbo.service.blogService.deleteBlog(_id);
    res.json(result);
  })

module.exports = router