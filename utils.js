const env = require('dotenv').config().parsed
const jwt = require('jsonwebtoken')
const ext = {}
const { JSONRPCErrorException } = require('json-rpc-2.0')
const jwtKey = env.JWTKEY

//生成uuid
ext.uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
}

//编码jwt
ext.encodeJwt = (obj, expMinute = 60) => {
  return jwt.sign(
    {
      data: obj,
      exp: Math.floor(Date.now() / 1000) + 60 * expMinute
    },
    jwtKey
  )
}

//解码jwt
ext.decodeJwt = (token) => {
  return jwt.verify(token, jwtKey)
}

//验证是否登陆
ext.checkLogin = (token) => {
  try {
    return ext.decodeJwt(token)
  } catch (e) {
    throw new JSONRPCErrorException('登录失效，请重新登录', 1000)
  }
}

//验证参数是否缺少
ext.checkArgs = (obj, ...list) => {
  const miss = []
  for (const item of list) {
    if (obj[item] == undefined) {
      miss.push(item)
    }
  }
  throw new Error('缺少参数：' + miss.join(','))
}

module.exports = ext
