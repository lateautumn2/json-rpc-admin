const fs=require('fs')
const {JSONRPCServer,JSONRPCErrorException} = require('json-rpc-2.0')

const s=new JSONRPCServer()

// 加载路由
for(const file of fs.readdirSync("view")){
    require(`./view/${file}`)(s)
}

// 这是一个抛出异常的范例
// s.addMethod("main.fail",()=>{
//     throw new JSONRPCErrorException("I am custom error",100,{
//         detail:"I am detail"
//     })
// })

module.exports=s