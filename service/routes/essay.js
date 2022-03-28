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
  router.post('/saveEssay', async (ctx) => {
    var date = new Date()
    date.setHours(date.getHours() + 8)
    let x = await Models.Essay.create({...ctx.request.body, create_date:date})
    ctx.body = {
      code: 0,
      data: x
    }
  })
  router.get('/essayList', async (ctx) => {
    let rs = await Models.Essay.findAndCountAll({
      limit: 100,
      offset: 0,
      order: [
        // 将转义用户名，并根据有效的方向参数列表验证DESC
        ['create_date', 'DESC']
      ]
    })
    ctx.body = {
      code: 0,
      count: rs.count,
      data: rs
    }
  })
}
