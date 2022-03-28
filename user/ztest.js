var request = require('request')
request(
  {
    url: 'http://pufa.vjianghu.cn/api/yexam/question/info?token=0354299c-1ad1-40fc-8dc9-edb58797c17b&_platform_=wx&_=1638955875771', // 请求的URL
    method: 'POST', // 请求方法
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // 输出网页内容
    }
  }
)
