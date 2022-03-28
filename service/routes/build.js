let Models = require('../models')
module.exports =  (router) => {
  router.get('/essayDetail', async (ctx) => {
    let {id} = ctx.query
    let rs = await Models.Essay.findOne({
      where: {
        id
      }
    })
    ctx.body = {
      code: 0,
      data: rs
    }
  })
  router.post('/saveBuild', async (ctx) => {
    // var date = new Date()
    // date.setHours(date.getHours() + 8)
    let _data = {...ctx.request.body}
    let x = await Models.Build.findOrCreate({
      where: { name: _data.name },
      defaults: _data
    });
    console.log(x)
    ctx.body = {
      code: 0,
      data: x
    }
  })
  router.get('/list', async (ctx) => {
    let rs = await Models.Build.findAll()
    ctx.body = {
      code: 0,
      data: rs
    }
  })
}
