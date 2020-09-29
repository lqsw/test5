const { Dubbo, java, setting } = require('dubbo2.js')
const interfaceName = 'com.dubbo.learn.dubbo.BlogService'
const interfaceVersion = '1.0.0'
const dubboSetting = setting.match(
  interfaceName, { version: interfaceVersion }
)

const blogService = blogDubbo => blogDubbo.proxyService({
  dubboInterface: interfaceName,
  version: '1.0.0',
  methods: {
    getListBlog(author_id) {
      return [
        java.String(author_id)
      ]
    },
    getBlogListByTitle(author_id, title) {
      return [
        java.String(author_id), java.String(title)
      ]
    },
    writeBlog(title, content, author_id) {
      return [
        java.String(title), java.String(content), java.String(author_id)
      ]
    },
    deleteBlog(_id) {
      return [
        java.String(_id)
      ]
    },
    readBlog(_id) {
      return [
        java.String(_id)
      ]
    },
    editBlog(_id, inputTitle, inputContent,author_id) {
      return [
        java.String(_id), java.String(inputTitle), java.String(inputContent),java.String(author_id)
      ]
    }
  }
})

const service = { blogService }

const blogDubbo = new Dubbo({
  application: { name: 'blog' },
  register: '192.168.8.130:2181',
  dubboSetting,
  service
})


module.exports = blogDubbo