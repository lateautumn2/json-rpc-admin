const { JSONRPCServer, JSONRPCErrorException } = require('json-rpc-2.0')
const { encodeJwt, checkLogin } = require('../utils')
const db = require('../db')

module.exports = (s) => {
  s.addMethod('main.login', async ({ username, password }) => {
    const obj = await db.findUser(username)
    if (!obj) {
      throw new Error('无此用户')
    }
    const isok = obj.password == password
    if (!isok) {
      throw new Error('密码错误')
    }
    return {
      token: encodeJwt({
        id: obj.id,
        username
      })
    }
  })
}
