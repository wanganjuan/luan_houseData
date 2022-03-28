const Router = require('koa-router')
const router = new Router({
  prefix: '/api'
})
router.get("/", async (ctx, next) => {
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  // ctx.body = n + ' views';
  ctx.state = {
    title: ctx.session.user,
  };
  await ctx.render("index", ctx.state);
});
const abRouter = new Router({
  prefix: '/ab'
})

const companyRouter = new Router({
  prefix: '/company'
})
const buildRouter = new Router({
  prefix: '/build'
})
const dongRouter = new Router({
  prefix: '/dong'
})
const roomRouter = new Router({
  prefix: '/room'
})
const userRouter = new Router({
  prefix: '/api/user'
})

const essayRouter = new Router({
  prefix: '/api/essay'
})
const routes = require('./routes')
const userRoutesFunc = require('./routes/user')
const essayRoutesFunc = require('./routes/essay')
const abilityRoutesFunc = require('./routes/ability')
const companyRoutesFunc = require('./routes/company')
const buildRoutesFunc = require('./routes/build')
const DongRoutesFunc = require('./routes/dong')
const RoomRoutesFunc = require('./routes/room')
routes(router)
userRoutesFunc(userRouter)
essayRoutesFunc(essayRouter)
abilityRoutesFunc(abRouter)
companyRoutesFunc(companyRouter)
buildRoutesFunc(buildRouter)
DongRoutesFunc(dongRouter)
RoomRoutesFunc(roomRouter)

module.exports  = {
  appFunc: (app) => {
    app.use(router.routes())
    .use(userRouter.routes())
    .use(essayRouter.routes())
    .use(abRouter.routes())
    .use(companyRouter.routes())
    .use(buildRouter.routes())
    .use(dongRouter.routes())
    .use(roomRouter.routes())
    .use(router.allowedMethods())
  }
}