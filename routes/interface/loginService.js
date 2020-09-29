const { Dubbo, java, setting } = require('dubbo2.js')
const interfaceName = 'com.dubbo.learn.dubbo.LoginService'
const interfaceVersion = '1.0.0'
const dubboSetting = setting.match(
  interfaceName, { version: interfaceVersion }
)

const loginService = loginDubbo => loginDubbo.proxyService({
  dubboInterface: interfaceName,
  version: '1.0.0',
  methods: {
    Login(userName, password) {
      return [
        java.String(userName), java.String(password)
      ]
    }
  }
})


const service = { loginService }

const loginDubbo = new Dubbo({
  application: { name: 'login' },
  register: '192.168.8.130:2181',
  dubboSetting,
  service
})

module.exports = loginDubbo