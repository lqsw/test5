var express = require('express');
var router = express.Router();
var blogDubbo = require('./interface/blogService');


router.get('/', async (req, res, next) => {
  console.info(`[blog]:==:> start`)
  var i = 0;
  var result;
  if (typeof (req.query.searchBlog) === 'undefined') {
    result = await blogDubbo.service.blogService.getListBlog(req.session._id);
  } else {
    result = await blogDubbo.service.blogService.getBlogListByTitle(req.session._id, req.query.searchBlog);
  }
  for (i = 0; i < result.res.length; i++) {
    var timestamp = result.res[i]["date"];
    timestamp = parseInt(timestamp);
    result.res[i].author_id = req.session.userName;
    result.res[i]["date"] = timestampToTime(timestamp);
  }
   res.json(result.res);
  // res.render("blog", { Blog: result.res });
});

router.post('/', async (req, res) => {
  console.info(`[deleteBlog]:==:> start`)
  var body = req.body;
  var _id = body._id;
  console.log(req)
  const result = await blogDubbo.service.blogService.deleteBlog(_id);
  res.json(result);
})

function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

module.exports = router;
