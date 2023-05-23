const env = require('dotenv').config().parsed
const { attachPaginate } = require('knex-paginate')
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
  }
})
attachPaginate()

// 日期格式化
const df = (val, as = val) => {
  return knex.raw(`date_format(${val},'%Y-%m-%d %H:%i:%s') as ${as}`)
}

const s = {}

// 根据名字查找用户
s.findUser = (name) => {
  return knex('user').where('username', name).first()
}

//获取全部设备列表
s.getAllBaisc = (o) => {
  return knex('basic_list').select('id', 'sn', 'status', 'update_time', 'put_time', 'out_time').paginate({
    perPage: o.pageSize,
    currentPage: o.pageNumber
  })
}

module.exports = s
