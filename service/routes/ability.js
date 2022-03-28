let Models = require('../models')
module.exports = (router) => {
  router.get('/ablist', async (ctx) => {
    // let {id} = ctx.query
    let rs = await Models.T_ability.findAll()
    ctx.body = {
      code: 0,
      data: rs
    }
  })
}
