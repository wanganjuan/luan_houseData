var {saveCompany, saveBuild} = require('./http')
var request = require('request')
var cheerio = require('cheerio');
var $ = null
var companyList = []
// 通过 GET 请求来读取 http://cnodejs.org/ 的内容
const homePromise = (url = 'http://fgw.luan.gov.cn/jgfw/spzfjgba/index.html') => {
  return new Promise((resolve, reject) => {
    request(
      {
        url, // 请求的URL
        method: 'GET', // 请求方法
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          return resolve(body) // 输出网页内容
        }
      }
    )
  })
}
const _foreach = (tableList, func) => {
  Array.prototype.forEach.call(tableList, func)
}
function _table (trList, buildInfoList) {
  // 企业
  var company = trList.eq(1).find('td').eq(1).text().trim()
  if (!companyList.includes(company)) {
    console.log(111)
    companyList.push(company)
  }
  var buildName = trList.eq(1).find('td').eq(3).text().trim()
  // 位置
  var positionDesc = trList.eq(2).find('td').eq(1).text().trim()
  var positionArea = trList.eq(2).find('td').eq(3).text().trim()
  // 备案楼号： 时间
  var buildNum = trList.eq(3).find('td').eq(1).text().trim()
  var time = trList.eq(3).find('td').eq(3).text().trim()
  // 备案面积  价格
  var buildArea = trList.eq(4).find('td').eq(1).text().trim()
  var unitPrice = trList.eq(4).find('td').eq(3).text().trim()
  // trList
  // console.log(company, buildName, positionDesc, positionArea, buildNum, time, buildArea, unitPrice)
  // 遍历各个房间的价格, 从index === 6 
  var roomList = []
  _foreach(trList, (element, index) => {
    if (index > 5) {
      // 房号
      var _this = $(element).find('td')
      var num = _this.eq(0).text().trim()
      var rBuildArea = _this.eq(1).text().trim()
      var rUseArea = _this.eq(2).text().trim()
      var rCommonArea = _this.eq(3).text().trim()
      var price = _this.eq(4).text().trim()
      var totalPrice = _this.eq(5).text().trim()
      var display = _this.eq(6).text().trim()
      var decorate = _this.eq(7).text().trim()
      var remark = _this.eq(8).text().trim()
      roomList.push({
        num, rBuildArea, rUseArea,rCommonArea,price,totalPrice,display,decorate, remark
      })
      // console.log(num, rBuildArea, rUseArea,rCommonArea,price,totalPrice,display,decorate, remark)
    }
  })
  // buildInfoList.push({
  //   baseInfo: {company, buildName, positionDesc, positionArea, buildNum, time, buildArea, unitPrice},
  //   roomInfo: roomList
  // })
  // console.log(22)
  // saveCompany({
  //   name: company
  // }).then((res) => {
  //   console.log(11)
  //   if (res.data.code === 0) {
  //     var _id = res.data.id
  //     // saveBuild({
  //     //   cid: res.data.data.id
  //     // })
  //     console.log(res.data)
  //   }
  // })
  // 这边可以进行数据更新
}

function _homePromise (url) {
  homePromise(url).then((data) => {
    console.log("==========================")
    var $ = cheerio.load(data)
    var tableList = $('table')
    let buildInfoList = []
    _foreach(tableList, (element => {
      _table($(element).find('tr'), buildInfoList)
    }))
    console.log(companyList)
    // console.log(buildInfoList)
  })
}
homePromise().then((data) => {
  $ = cheerio.load(data)
  var list = $('.doc_list li')
  var urlList = []
  Array.prototype.forEach.call(list, (element => {
    _homePromise($(element).find('a').attr('href'))
  }))
  // _homePromise(list.eq(0).find('a').attr('href'))
})