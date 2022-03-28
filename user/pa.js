var { saveCompany, saveBuild, getCompanyList, getBuildList, saveDong, getDongList, saveRoom } = require('./http')
var request = require('request')
var fs = require('fs')
var cheerio = require('cheerio')
var $ = null
const _index = 3
var checkTag = false
var baseUrl = 'http://fgw.luan.gov.cn/content/column/xxx?pageIndex='
var companyList = []
var buildList = []
var dongList = []
var roomList = []
var _total = 0
var sTime = 0
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
function _table(trList) {
  let hasNoHeader = false
  if (trList.eq(0).find('td').eq(3).text().replace(/\s+/g, '')) {
    hasNoHeader = true
  }
  let c13Tag = false
  let c14Tag = false
  let baoyeTag = false
  // 判断
  if (trList.eq(0).find('td').eq(0).text().replace(/\s+/g, '') && trList.eq(0).find('td').eq(0).text().replace(/\s+/g, '').includes('宝业.君悦绿苑')) {
    c13Tag = true
  }
  if (trList.eq(1).find('td').eq(2).text().replace(/\s+/g, '') === '徽盐.龙湖湾') {
    c14Tag = true
  }
  // 企业
  var company = trList
    .eq(hasNoHeader ? 0 : 1)
    .find('td')
    .eq(1)
    .text()
    .replace(/\s+/g, '')
  // 为空说明有问题
  let tag = false
  // 缺失第二个
  let lostSecondTag = false
  let x1 = trList.eq(1).find('td').eq(1).text().replace(/\s+/g, '')
  let x2 = trList.eq(1).find('td').eq(4).text().replace(/\s+/g, '')
  if (!x1 && x2) {
    lostSecondTag = true
  }
  if (lostSecondTag) {
    company = trList.eq(1).find('td').eq(2).text().replace(/\s+/g, '')
  }
  if (c13Tag) {
    // let oneReg = /开发企业：(.*)楼盘名称：(.*)/
    let oneReg = /开发企业：(.*)楼盘名称：(.*)/
    company = trList.eq(0).find('td').eq(0).text().replace(/\s+/g, '').replace(oneReg, '$1').replace(/\s+/g, '')
  }
  if (c14Tag) {
    company = trList.eq(2).find('td').eq(2).text().replace(/\s+/g, '')
  }
  if (!company) {
    tag = true
    var nameReg = /开发企业：(.*)楼盘名称：(.*)/
    company = trList.eq(1).find('td').eq(0).text().replace(/\s+/g, '').replace(nameReg, '$1').replace(/\s+/g, '')
    console.log(company)
  }
  if (company === '案名：天悦南湖均价：6199.50元/㎡') {
    return
  }
  if (!companyList.includes(company)) {
    // console.log(111)
    companyList.push(company)
  }
  var buildName = trList
    .eq(hasNoHeader ? 0 : 1)
    .find('td')
    .eq(3)
    .text()
    .replace(/\s+/g, '')
  if (trList.eq(1).find('td').eq(4).text().replace(/\s+/g, '')) {
    buildName = trList.eq(1).find('td').eq(4).text().replace(/\s+/g, '')
  }
  if (lostSecondTag) {
    buildName = trList.eq(1).find('td').eq(4).text().replace(/\s+/g, '')
  }
  if (tag) {
    var nameReg = /开发企业：(.*)楼盘名称：(.*)/
    buildName = trList.eq(1).find('td').eq(0).text().replace(/\s+/g, '').replace(nameReg, '$2').replace(/\s+/g, '')
    // console.log(buildName)
  }
  //
  // if (!buildName && _index === 10) {
  //   buildName = '万兴.铂月倾城'
  // }
  if (trList.eq(1).find('td').eq(5).text().replace(/\s+/g, '')) {
    buildName = trList.eq(1).find('td').eq(5).text().replace(/\s+/g, '')
  }
  if (c13Tag) {
    let oneReg = /开发企业：(.*)楼盘名称：(.*)/
    buildName = trList.eq(0).find('td').eq(0).text().replace(/\s+/g, '').replace(oneReg, '$2').replace(/\s+/g, '')
  }
  if (c14Tag) {
    buildName = trList.eq(1).find('td').eq(2).text().replace(/\s+/g, '')
  }
  // if ((buildName == '红达星河城二期（红达星河府）' || buildName == '红达.昆仑印') && _index === 1) {
  //   return
  // }
  // 位置
  var positionDesc = trList
    .eq(hasNoHeader ? 1 : 2)
    .find('td')
    .eq(1)
    .text()
    .replace(/\s+/g, '')
  var positionArea = trList
    .eq(hasNoHeader ? 1 : 2)
    .find('td')
    .eq(3)
    .text()
    .replace(/\s+/g, '')
  if (trList.eq(2).find('td').eq(4).text().replace(/\s+/g, '')) {
    positionArea = trList.eq(2).find('td').eq(4).text().replace(/\s+/g, '')
  }
  if (lostSecondTag) {
    positionDesc = trList
      .eq(hasNoHeader ? 1 : 2)
      .find('td')
      .eq(2)
      .text()
      .replace(/\s+/g, '')
    positionArea = trList
      .eq(hasNoHeader ? 1 : 2)
      .find('td')
      .eq(4)
      .text()
      .replace(/\s+/g, '')
  }
  if (tag) {
    let baseInfo = trList.eq(2).find('td').eq(0).text().replace(/\s+/g, '')
    let baseReg = /坐落位置：(.*)所在区域：(.*)/
    positionDesc = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    positionArea = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
  }
  if (c13Tag) {
    let baseInfo = trList.eq(1).find('td').eq(0).text().replace(/\s+/g, '')
    let baseReg = /坐落位置：(.*)所在区域：(.*)/
    positionDesc = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    positionArea = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
  }
  if (buildName && (buildName.includes('嘉利学府') || buildName.includes('宝业.君悦绿苑') || buildName.includes('徽盐.湖畔明珠'))) {
    baoyeTag = true
  }
  // 备案楼号： 时间
  var buildNum = trList
    .eq(hasNoHeader ? 2 : 3)
    .find('td')
    .eq(1)
    .text()
    .replace(/\s+/g, '')
  // 上次备案时间：
  var time = trList
    .eq(hasNoHeader ? 2 : 3)
    .find('td')
    .eq(3)
    .text()
    .replace(/\s+/g, '')
  let hasLastTag = false
  if (trList.eq(3).find('td').eq(2).text().replace(/\s+/g, '') === '上次备案时间：') {
    hasLastTag = true
    time = trList.eq(4).find('td').eq(3).text().replace(/\s+/g, '')
  }
  if (trList.eq(3).find('td').eq(4).text().replace(/\s+/g, '')) {
    time = trList.eq(3).find('td').eq(4).text().replace(/\s+/g, '')
  }
  if (lostSecondTag) {
    buildNum = trList
      .eq(hasNoHeader ? 2 : 3)
      .find('td')
      .eq(2)
      .text()
      .replace(/\s+/g, '')
    // 上次备案时间：
    time = trList
      .eq(hasNoHeader ? 2 : 3)
      .find('td')
      .eq(4)
      .text()
      .replace(/\s+/g, '')
  }
  if (tag) {
    let baseInfo = trList.eq(3).find('td').eq(0).text().replace(/\s+/g, '')
    let baseReg = /备案楼号：(.*)备案时间：(.*)/
    buildNum = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    time = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
    // console.log(baseInfo, buildNum, time)
  }
  if (c13Tag) {
    let baseInfo = trList.eq(2).find('td').eq(0).text().replace(/\s+/g, '')
    let baseReg = /备案楼号：(.*)备案时间：(.*)/
    buildNum = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    time = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
  }
  let isTwoBuildNum = false
  if (buildNum === '15#、16#' || buildNum === '60#、61#、62#、65#、66#、67#、69#、70#、71#、76#、77#、78#') {
    isTwoBuildNum = true
  }
  // 备案面积  价格
  var buildArea = trList
    .eq(hasNoHeader ? 3 : 4)
    .find('td')
    .eq(1)
    .text()
    .replace(/\s+/g, '')
  var unitPrice = trList
    .eq(hasNoHeader ? 3 : 4)
    .find('td')
    .eq(3)
    .text()
    .replace(/\s+/g, '')
  if (!hasNoHeader && trList.eq(4).find('td').eq(4).text().replace(/\s+/g, '')) {
    unitPrice = trList.eq(4).find('td').eq(4).text().replace(/\s+/g, '')
  }
  if (lostSecondTag) {
    buildArea = trList
      .eq(hasNoHeader ? 3 : 4)
      .find('td')
      .eq(2)
      .text()
      .replace(/\s+/g, '')
    unitPrice = trList
      .eq(hasNoHeader ? 3 : 4)
      .find('td')
      .eq(4)
      .text()
      .replace(/\s+/g, '')
  }
  if (hasLastTag) {
    buildArea = trList.eq(5).find('td').eq(1).text().replace(/\s+/g, '')
    unitPrice = trList.eq(5).find('td').eq(3).text().replace(/\s+/g, '')
  }
  if (_index === 10 && buildName === '六安新城吾悦广场(吾悦华府)' && trList.eq(3).find('td').eq(5).text().replace(/\s+/g, '')) {
    unitPrice = trList.eq(3).find('td').eq(4).text().replace(/\s+/g, '')
  }
  if (tag) {
    let baseInfo = trList.eq(4).find('td').eq(0).text().replace(/\s+/g, '')
    let baseReg = /备案面积：(.*)平均价格：(.*)/
    buildArea = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    unitPrice = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
  }
  if (c13Tag) {
    let baseInfo = trList.eq(3).find('td').eq(0).text().replace(/\s+/g, '')
    let baseReg = /备案面积：(.*)平均价格：(.*)/
    buildArea = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    unitPrice = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
  }
  if (c14Tag) {
    unitPrice = trList.eq(2).find('td').eq(3).text().replace(/\s+/g, '')
    let baseInfo = trList.eq(1).find('td').eq(3).text().replace(/\s+/g, '')
    let baseReg = /备案面积：(.*)/
    positionDesc = ''
    buildArea = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
    time = trList.eq(3).find('td').eq(2).text().replace(/\s+/g, '')
    buildNum = '16'
  }
  if (!buildName && buildNum == '2号楼' && time === '2019.9.19') {
    buildName = '万兴.铂月倾城'
  }
  let temp = buildList.find((item) => {
    return item.name === buildName
  })
  if (!temp) {
    buildList.push({
      cname: company,
      name: buildName,
      position: positionDesc,
      location: positionArea,
    })
  }
  let tempDong = dongList.find((item) => {
    return item.bname === buildName && buildNum === item.num
  })
  if (!tempDong) {
    if (isTwoBuildNum) {
      for (let numTemp of buildNum.split('、')) {
        dongList.push({
          bname: buildName,
          num: numTemp,
          time,
          area: buildArea,
          uprice: unitPrice,
        })
      }
    } else {
      dongList.push({
        bname: buildName,
        num: buildNum,
        time,
        area: buildArea,
        uprice: unitPrice,
      })
    }
  }

  let baseRoomIndex = 5
  if (hasLastTag) {
    baseRoomIndex = 6
  }
  if (hasNoHeader || c13Tag || c14Tag) {
    baseRoomIndex = 4
  }
  // room
  // 遍历各个房间的价格, 从index === 6
  _foreach(trList, (element, index) => {
    if (index > baseRoomIndex) {
      // 房号
      var _this = $(element).find('td')
      let buffer = 0
      if (_this.length >= 10) {
        buffer = 1
      }
      var num = _this
        .eq(0 + buffer)
        .text()
        .replace(/\s+/g, '')
      var rBuildArea = _this
        .eq(1 + buffer)
        .text()
        .replace(/\s+/g, '')
      var rUseArea = _this
        .eq(2 + buffer)
        .text()
        .replace(/\s+/g, '')
      var rCommonArea = _this
        .eq(3 + buffer)
        .text()
        .replace(/\s+/g, '')
      var price = _this
        .eq(4 + buffer)
        .text()
        .replace(/\s+/g, '')
      var totalPrice = _this
        .eq(5 + buffer)
        .text()
        .replace(/\s+/g, '')
      var display = _this
        .eq(6 + buffer)
        .text()
        .replace(/\s+/g, '')
      var decorate = _this
        .eq(7 + buffer)
        .text()
        .replace(/\s+/g, '')
      var remark = _this
        .eq(8 + buffer)
        .text()
        .replace(/\s+/g, '')
      // 判断是不是在一起的没有区分table
      let _length = _this.length
      // if (buildName.includes('光巴黎春天') && _length === 1) {
      //   console.log(index, trList
      //     .eq(index + 3)
      //     .find('td')
      //     .eq(1)
      //     .text()
      //     .replace(/\s+/g, ''),  _this.eq(0).text().replace(/\s+/g, ''))
      // }
      if (_length === 1 && _this.eq(0).text().replace(/\s+/g, '').includes('价格备案表')) {
        if (baoyeTag) {
          let baseInfo = trList
            .eq(index + 3)
            .find('td')
            .eq(0)
            .text()
            .replace(/\s+/g, '')
          let baseReg = /备案楼号：(.*)备案时间：(.*)/
          buildNum = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
          time = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
          baseInfo = trList
            .eq(index + 4)
            .find('td')
            .eq(0)
            .text()
            .replace(/\s+/g, '')
          baseReg = /备案面积：(.*)平均价格：(.*)/
          buildArea = baseInfo.replace(baseReg, '$1').replace(/\s+/g, '')
          unitPrice = baseInfo.replace(baseReg, '$2').replace(/\s+/g, '')
        } else {
          buildNum = trList
            .eq(index + 3)
            .find('td')
            .eq(1)
            .text()
            .replace(/\s+/g, '')
          time = trList
            .eq(index + 3)
            .find('td')
            .eq(3)
            .text()
            .replace(/\s+/g, '')
          // 备案面积  价格
          buildArea = trList
            .eq(index + 4)
            .find('td')
            .eq(1)
            .text()
            .replace(/\s+/g, '')
          unitPrice = trList
            .eq(index + 4)
            .find('td')
            .eq(3)
            .text()
            .replace(/\s+/g, '')
        }
        dongList.push({
          bname: buildName,
          num: buildNum,
          time,
          area: buildArea,
          uprice: unitPrice,
        })
        // console.log({
        //   bname: buildName,
        //   num: buildNum,
        //   time,
        //   area: buildArea,
        //   uprice: unitPrice,
        // })
      }
      if (totalPrice && totalPrice !== buildName && num !== '房号' && num && num !== '备案面积：') {
        if (hasLastTag) {
          rUseArea = '重新备案'
          rCommonArea = '重新备案'
          price = _this.eq(3).text().replace(/\s+/g, '')
        }
        if (isTwoBuildNum) {
          // 15#、16#
          // 15#101
          buildNum = num.split('#')[0] + '#'
          num = num.split('#')[1]
        }
        if (num && num.split('#').length > 1) {
          num = num.split('#')[1]
        }
        if (num && num.split('-').length > 1) {
          num = num.split('-')[1]
        }
        let tempRoom = roomList.find((item) => {
          return item.bname === buildName && item.bnum === buildNum && item.num === num
        })
        if (!tempRoom) {
          roomList.push({
            bname: buildName,
            bnum: buildNum,
            num,
            totalArea: rBuildArea,
            useArea: rUseArea,
            commonArea: rCommonArea,
            price,
            totalPrice,
            display,
            decorate,
            remark,
          })
        }
        // console.log(num, rBuildArea, rUseArea,rCommonArea,price,totalPrice,display,decorate, remark)
      } else {
        console.log('统计次数===', buildName, buildNum, index)
      }
    }
  })
}

function _homePromise(url) {
  homePromise(url).then((data) => {
    console.log('==========================')
    var $ = cheerio.load(data)
    var tableList = $('table')
    let buildInfoList = []
    _foreach(tableList, (element) => {
      _table($(element).find('> tbody').find('> tr'), buildInfoList)
    })
    // console.log(companyList)
    // console.log(buildList)
    // console.log(buildInfoList)
  })
}
// 每一页处理
function every(data) {
  $ = cheerio.load(data)
  var list = $('.doc_list li')
  var urlList = []
  Array.prototype.forEach.call(list, (element, index) => {
    if (index !== -1) {
      // if (index  === 0) {
      urlList.push(homePromise($(element).find('a').attr('href')))
    }

    // _homePromise($(element).find('a').attr('href'))
  })
  Promise.all(urlList).then((dataList) => {
    _foreach(dataList, (data) => {
      var $ = cheerio.load(data)
      var tableList = $('table')
      let buildInfoList = []
      _foreach(tableList, (element) => {
        _table($(element).find('> tbody').find('> tr'), buildInfoList)
      })
    })
    // 批量更新
    let _companyList = []
    for (let name of companyList) {
      fs.appendFileSync(`./${_index}name.md`, name + '\r\n', function (error) {
        if (error) {
          console.log('写入失败')
        } else {
          console.log('写入成功了')
        }
      })
      if (!checkTag) {
        _companyList.push(saveCompany({ name }))
      }
    }
    Promise.all(_companyList)
      .then((xxx) => {
        return getCompanyList()
      })
      .then((res) => {
        var _data = res.data
        var tempMap = {}
        for (let { id, name } of _data) {
          tempMap[name] = id
        }
        // 批量更新
        let _buildList = []
        for (let build of buildList) {
          build.cid = tempMap[build.cname]
          build.page = _index
          fs.appendFileSync(`./${_index}build.md`, JSON.stringify(build) + '\r\n', function (error) {
            if (error) {
              console.log('写入失败')
            } else {
              console.log('写入成功了')
            }
          })
          if (!checkTag) {
            _buildList.push(saveBuild(build))
          }
        }
        return Promise.all(_buildList)
      })
      .then((buildXX) => {
        return getBuildList()
      })
      .then((buildRes) => {
        var _data = buildRes.data
        var tempMap = {}
        for (let { id, name } of _data) {
          tempMap[name] = id
        }
        // 批量更新
        let _dongList = []
        //  console.log(tempMap)
        //  console.log(dongList)
        for (let dong of dongList) {
          dong.bid = tempMap[dong.bname]
          // console.log(dong.bname, tempMap[dong.bname])
          dong.page = _index
          dong.uprice = dong.uprice.replace(/[^0-9^\.]/gi, '') || '0'
          if (dong.uprice == '157000167000') {
            dong.uprice = '7000'
          }
          fs.appendFileSync(`./${_index}dong.md`, JSON.stringify(dong) + '\r\n', function (error) {
            if (error) {
              console.log('写入失败')
            } else {
              console.log('写入成功了')
            }
          })
          if (!checkTag) {
            _dongList.push(saveDong(dong))
          }
        }
        return Promise.all(_dongList)
      })
      .then((buildXX) => {
        return getDongList()
      })
      .then((DongRes) => {
        var _data = DongRes.data
        var tempMap = {}
        for (let { id, bname, num } of _data) {
          // item.bname === buildName && item.bnum === buildNum && item.num === num
          tempMap[bname + '_' + num] = id
        }
        console.log(roomList.length)
        // 批量更新
        let _roomList = []
        fs.appendFileSync('./data.md', roomList.length + '_', function (error) {
          if (error) {
            console.log('写入失败')
          } else {
            console.log('写入成功了')
          }
        })
        for (let room of roomList) {
          // item.bname === buildName && item.bnum === buildNum && item.num === num
          room.did = tempMap[room.bname + '_' + room.bnum]
          fs.appendFileSync(`./${_index}room.md`, JSON.stringify(room) + '\r\n', function (error) {
            if (error) {
              console.log('写入失败')
            } else {
              console.log('写入成功了')
            }
          })
          if (!checkTag) {
            _roomList.push(saveRoom(room))
          }
        }
        //  console.log(_roomList.length)
        //  return Promise.all(_roomList)
      })
    // console.log(companyList)
    // console.log(buildList)
    // console.log(companyList)
  })
}

function getAllData() {
  sTime = new Date().getTime()
  console.log(sTime)
  var pageList = []
  // for (let i = 0; i< 3; i++) {
  //   pageList.push(homePromise(baseUrl+i))
  // }
  pageList.push(homePromise(baseUrl + _index))
  Promise.all(pageList).then((pageData) => {
    for (let _pageData of pageData) {
      every(_pageData)
    }
    // console.log(pageList)
  })
}
homePromise().then((data) => {
  $ = cheerio.load(data)
  if (data) {
    // console.log(data)
    let _pageId = $('.pagination').attr('id').split('_')[1]
    // 获取总的页数
    var p = /pageCount:(.*),/
    _total = data.match(p)[1]
    console.log(_total)
    baseUrl = baseUrl.replace('xxx', _pageId)
    console.log(baseUrl)
    getAllData()
    return
  }
  var list = $('.doc_list li')
  var urlList = []
  Array.prototype.forEach.call(list, (element, index) => {
    if (index !== -1) {
      urlList.push(homePromise($(element).find('a').attr('href')))
    }

    // _homePromise($(element).find('a').attr('href'))
  })
  Promise.all(urlList).then((dataList) => {
    _foreach(dataList, (data) => {
      var $ = cheerio.load(data)
      var tableList = $('table')
      let buildInfoList = []
      _foreach(tableList, (element) => {
        _table($(element).find('tr'), buildInfoList)
      })
    })
    // 批量更新
    let _companyList = []
    for (let name of companyList) {
      _companyList.push(saveCompany({ name }))
    }
    console.log(companyList)
    Promise.all(_companyList)
      .then((xxx) => {
        return getCompanyList()
      })
      .then((res) => {
        var _data = res.data
        var tempMap = {}
        for (let { id, name } of _data) {
          tempMap[name] = id
        }
        // 批量更新
        let _buildList = []
        for (let build of buildList) {
          build.cid = tempMap[build.cname]
          _buildList.push(saveBuild(build))
        }
        return Promise.all(_buildList)
      })
      .then((buildXX) => {
        return getBuildList()
      })
      .then((buildRes) => {
        var _data = buildRes.data
        var tempMap = {}
        for (let { id, name } of _data) {
          tempMap[name] = id
        }
        // 批量更新
        let _dongList = []

        for (let dong of dongList) {
          dong.bid = tempMap[dong.bname]
          console.log(dong.bname, tempMap[dong.bname])
          _dongList.push(saveDong(dong))
        }
        return Promise.all(_dongList)
      })
      .then((buildXX) => {
        return getDongList()
      })
      .then((DongRes) => {
        var _data = DongRes.data
        var tempMap = {}
        for (let { id, bname, num } of _data) {
          // item.bname === buildName && item.bnum === buildNum && item.num === num
          tempMap[bname + '_' + num] = id
        }
        console.log(roomList.length)
        // 批量更新
        let _roomList = []
        for (let room of roomList) {
          // item.bname === buildName && item.bnum === buildNum && item.num === num
          room.did = tempMap[room.bname + '_' + room.bnum]
          _roomList.push(saveRoom(room))
        }
        return Promise.all(_roomList)
      })
    // console.log(companyList)
    // console.log(buildList)
    // console.log(companyList)
  })
  // _homePromise(list.eq(0).find('a').attr('href'))
})
