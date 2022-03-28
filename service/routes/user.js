let Models = require('../models')
module.exports =  (router) => {
  router.post('/login', async (ctx) => {
    let rs = await Models.User.findOne({
      where: ctx.request.body
    })
    if (rs) {
      ctx.session.user = JSON.stringify(rs)
      ctx.body = {
        data: rs,
        code: 0
      }
      return
    }
    ctx.body = {
      code: 99,
      msg: '用户名或者密码错误'
    }
  })
  router.get('/loginInfo', (ctx) => {
    if (!!ctx.session.user) {
      return ctx.body = {
        data: JSON.parse(ctx.session.user),
        code: 0
      }
    }
    ctx.body = {
      code: 99,
      msg: '请先登录'
    }
  })
  router.post('/loginOut', (ctx) => {
    ctx.session.user = null
    ctx.body = {
      code: 0,
      msg: '退出成功'
    }
  })
}
