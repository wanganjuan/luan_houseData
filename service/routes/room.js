let Models = require('../models')
var fs = require('fs')
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
  router.post('/saveRoom', async (ctx) => {
    // var date = new Date()
    // date.setHours(date.getHours() + 8)
    let _data = {...ctx.request.body}
    let x = await Models.Room.findOrCreate({
      where: { num: _data.num, did: _data.did },
      defaults: _data
    });
    // fs.appendFileSync('./data.md', JSON.stringify(x) + '\r\n', function (error) {
    //   if (error) {
    //     console.log('写入失败')
    //   } else {
    //     console.log('写入成功了')
    //   }
    // })
    ctx.body = {
      code: 0,
      data: x
    }
  })
  router.get('/list', async (ctx) => {
    let rs = await Models.Room.findAll()
    ctx.body = {
      code: 0,
      data: rs
    }
  })
}
