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
  router.post('/saveDong', async (ctx) => {
    // var date = new Date()
    // date.setHours(date.getHours() + 8)
    let _data = {...ctx.request.body}
    let x = await Models.Dong.findOrCreate({
      where: { num: _data.num, bid: _data.bid },
      defaults: _data
    });
    ctx.body = {
      code: 0,
      data: x
    }
  })
  router.get('/list', async (ctx) => {
    let rs = await Models.Dong.findAll()
    ctx.body = {
      code: 0,
      data: rs
    }
  })
}
