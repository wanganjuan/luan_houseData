var axios = require('axios')
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
const url = 'http://localhost:3000'
const saveCompany = async (data) => {
  const _url = url + '/company/saveCompany'
  return await axios.post(_url, data)
}

const getCompanyList = () => {
  const _url = url + '/company/list'
  return axios.get(_url)
}

const saveBuild = async (data) => {
  const _url = url + '/build/saveBuild'
  return await axios.post(_url, data)
}
const getBuildList = () => {
  const _url = url + '/build/list'
  return axios.get(_url)
}

const saveDong = async (data) => {
  const _url = url + '/dong/saveDong'
  return await axios.post(_url, data)
}

const getDongList = () => {
  const _url = url + '/dong/list'
  return axios.get(_url)
}

const saveRoom = async (data) => {
  const _url = url + '/room/saveRoom'
  return await axios.post(_url, data)
}


module.exports = {
  saveCompany,
  saveBuild,
  getCompanyList,
  getBuildList,
  saveDong,
  getDongList,
  saveRoom
};