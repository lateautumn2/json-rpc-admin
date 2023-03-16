const {JSONRPCServer,JSONRPCErrorException} = require('json-rpc-2.0')
const db = require('../db')

module.exports = (s) => {
    s.addMethod("main.fail",()=>{
        throw new JSONRPCErrorException("I am custom error",100,{
            detail:"I am detail"
        })
    })
    
    s.addMethod("main.login",({user,pass})=>{
        return `${user} has logined with pass: ${pass}`
    })
}