let Models = require('../models')
module.exports =  (router) => {
  router.get('/clazz', async (ctx) => {
    let rs = await Models.User.findAndCountAll({
        limit: 10,
        offset: 0
    })
    ctx.body = {
      code: 0,
      count: rs.count,
      data: rs
    }
  })
}
