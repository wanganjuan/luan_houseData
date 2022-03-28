const Models = require('../models');
const router = require('koa-router')()
const formidable = require('formidable')
const util = require('util')

router.get('/md', async (ctx) => {
  let {mId} = ctx.query
  let rs = await Models.Mds.findOne({
    where: {
      id: mId
    }
  })
  ctx.body = {
    code: 0,
    data: rs
  }
})

router.put('/md', async (ctx) => {
  let {id, content} = ctx.request.body
  let rs = await Models.Mds.update({
    content
  }, {
    where: {
      id
    }
  })
  ctx.body = {
    code: 0,
    data: rs
  }
})

router.post('/upload/img', async (ctx) => {
  let {body, files} = ctx.request
  console.log(body, files)
})
module.exports = router
