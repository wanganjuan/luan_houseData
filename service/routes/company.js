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
  router.post('/saveCompany', async (ctx) => {
    // var date = new Date()
    // date.setHours(date.getHours() + 8)
    let _data = {...ctx.request.body}
    let x = await Models.Company.findOrCreate({
      where: {
        name:_data.name
      },
      default: _data
    })
    console.log(_data)
    // let x = await Models.Company.bulkCreate(_data.list, {
    //   ignoreDuplicates : true,
    //   updateOnDuplicate: ['name']
    // })
    ctx.body = {
      code: 0,
      data: x
    }
  })
  router.get('/list', async (ctx) => {
    let rs = await Models.Company.findAll()
    ctx.body = {
      code: 0,
      data: rs
    }
  })
  router.get('/list', async (ctx) => {
    let rs = await Models.Company.findAndCountAll()
    ctx.body = {
      code: 0,
      data: rs
    }
  })
}
