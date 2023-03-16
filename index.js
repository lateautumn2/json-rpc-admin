const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const views = require('./views')
const rpc = require('./views-jsonrpc')
const logger = require('koa-logger')


const app = new Koa();
const router = new Router()
// jsonrpc网关
router.post('/rpc',async(ctx)=>{
    const res=await rpc.receive(ctx.request.body)
    if(res){
        ctx.body=res
    }else{
        ctx.status=204
    }
})
// 常规接口
views(router)
//log
app.use(logger())
// body parser
app.use(bodyParser())
// add router
app.use(router.routes())
app.use(router.allowedMethods())

console.log("server running...")
app.listen(3000);