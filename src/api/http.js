import axios from 'axios'
import {  getUserInfo } from '@/utils/auth'
import qs from 'qs'

axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const BASEURL = "http://39.99.140.176:8112/";

//39.99.140.176
axios.defaults.baseURL = BASEURL



let $httpVue = null; let currentToken = ''; let current_user_id = ''
const _Authorization = 'Authorization'; const _Bearer = 'Bearer '; const _UserID = 'user_id'
function init (vue) {
  $httpVue = vue
}

let loading = {
  show (obj) { // 可选值为true,string="当前提示的文本"
    let text = '正在处理中.....'
    if (typeof obj === 'string') {
      text = obj
    }
    $loading = $httpVue.$loading({
      lock: true,
      target: '#loading-container',
      customClass: 'el-loading',
      text: text,
      spinner: 'el-icon-loading',
      background: 'rgba(58, 61, 63, 0.32)'
    })
  },
  close () {
    // $loading.close();
  }
}

axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
    // console.log(config);
  }
  return config
}, (error) => {
  // console.log(error)
  Promise.reject(error)
}
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  _showLoading && loading.close()
  // 对响应数据做些事
  if (res.data.success) {
    return res
  }
  return Promise.resolve(res)
}, (error) => {
  _showLoading && loading.close()
  let httpMessage = ''
  if (error.response.data && error.response.data.message) {
    httpMessage = error.response.data.message
  } else if (error.response.status == '404') {
    httpMessage = '没有找到请求的地址'
  } else {
    httpMessage = '网络好像出了点问题~'
  }

  redirect(error.response, httpMessage)
  return Promise.reject(error.response)
})

function redirect (responseText, message) {
  try {
    let responseData = typeof responseText === 'string' ? JSON.parse(responseText) : responseText
    //  $httpVue.$message.error(responseData.message || '~服务器好像出了点问题...')
    if ((responseData.hasOwnProperty('code') && responseData.code == 401) ||
            (responseData.data && responseData.data.code == 401)) {
      toLogin()
    } else {
      $httpVue.$message.error(message)
    }
  } catch (error) {
    // console.log(error);
    $httpVue.$message.error(responseText)
  }
}

function toLogin () {
  $httpVue.$router.push({ path: '/login', params: { r: Math.random() } })
}

function getToken () {
  if (currentToken) {
    return _Bearer + currentToken
  }
  return ""
}

function getUserID () {
  if (current_user_id) {
    return current_user_id
  }
  let userInfo = getUserInfo()
  if (userInfo == null){
    return ''
  }
  current_user_id = userInfo.id
  return current_user_id
}

let _showLoading

function uploadFile(url,file){
  axios.defaults.headers[_Authorization] = getToken()
  axios.defaults.headers[_UserID] = getUserID()
  let param = new FormData(); //创建form对象
  param.append('file', file, file.name);
  return new Promise((resolve,reject)=>{
    console.log(axios.defaults.headers);
    let headers = {};
    headers['Content-Type'] = 'multipart/form-data';
    axios({
      method: "POST",
      url: url,
      data: param,
      //142.93.14.185
      baseURL: BASEURL,
      withCredentials: false,
      headers: headers
    }).then((response) => {
      if (response.status == 202) {
        getNewToken(() => { post(url, params, _showLoading) })
        return
      }
      resolve(response)
    }, (err) => {
      console.log(err)
      if (err.status == 202) {
        getNewToken(() => { post(url, params, _showLoading) })
        return
      }
      reject(err.data && err.data.message ? err.data.message : '网络好像出了点问题~~')
    }).catch((err) => {
      reject(err)
    })
  });
  
}

function post (url, params, showLoading) {
  _showLoading = showLoading
  axios.defaults.headers[_Authorization] = getToken()
  axios.defaults.headers[_UserID] = getUserID()
  // console.log(axios.defaults.headers);
  return new Promise((resolve, reject) => {
    let method = 'post'
    console.log(params)
    axios({
      method: method,
      url: url,
      data: params,
      //142.93.14.185
      //http://39.99.140.176
      baseURL: BASEURL,
      withCredentials: false,
      headers: axios.defaults.headers
    }).then((response) => {
      // console.log(response)
      if (response.status == 202) {
        getNewToken(() => { post(url, params, _showLoading) })
        return
      }
      resolve(response)
    }, (err) => {
      // console.log('wwwww')
      console.log(err)
      if (err.status == 202) {
        getNewToken(() => { post(url, params, _showLoading) })
        return
      }
      reject(err.data && err.data.message ? err.data.message : '网络好像出了点问题~~')
    }).catch((err) => {
      reject(err)
    })

    // axios.post(url, params, { headers: { 'Content-Type': 'application/json' } })
    //     .then(response => {
    //         if (response.status == 202) {
    //             getNewToken(() => { post(url, params, _showLoading); });
    //             return;
    //         }
    //         resolve(response.data);
    //     }, err => {
    //         if (err.status == 202) {
    //             getNewToken(() => { post(url, params, _showLoading); });
    //             return;
    //         }
    //         reject(err.data && err.data.message ? err.data.message : '网络好像出了点问题~~');
    //     })
    //     .catch((error) => {
    //         reject(error)
    //     });
  })
}

// _showLoading=true异步请求时会显示遮罩层,_showLoading=字符串，异步请求时遮罩层显示当前字符串
function get (url, param, showLoading) {
  _showLoading = showLoading
  axios.defaults.headers[_Authorization] = getToken()
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        if (response.status == 202) {
          getNewToken(() => { get(url, param, _showLoading) })
          return
        }
        resolve(response.data)
      }, err => {
        if (err.status == 202) {
          getNewToken(() => { get(url, param, _showLoading) })
          return
        }
        redirect(response.data)
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function ajax (param) {
  let httpParam =
        Object.assign({
          url: '',
          headers: {},
          param: {},
          json: true,
          success: function () { },
          errror: function () { },
          type: 'post',
          async: true
        }, param)

  httpParam.url = axios.defaults.baseURL + httpParam.url.replace(/\/?/, '')
  httpParam.headers[_Authorization] = getToken()
  var xhr = createXHR()
  // console.log(xhr.readyState);
  xhr.onreadystatechange = function () {
    if (xhr.status == 403 || xhr.status == 401) {
      redirect(xhr.responseText)
      return
    }
    if (xhr.status == 202) {
      getNewToken(() => {
        ajax(param)
      })
      return
    }
    if (xhr.readyState == 4 && xhr.status == 200) {
      httpParam.success(httpParam.json ? JSON.parse(xhr.responseText) : xhr.responseText)
      return
    }
    if (xhr.status != 0 && xhr.readyState != 1) {
      httpParam.errror(xhr)
    }
  }
  // 初始化请求
  xhr.open(
    httpParam.type,
    httpParam.url,
    httpParam.async
  )
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  for (const key in httpParam.headers) {
    xhr.setRequestHeader(key, httpParam.headers[key])
  }
  let dataStr = ''
  for (const key in httpParam.param) {
    dataStr += key + '=' + httpParam.param[key]
  }
  xhr.send(dataStr)
}

function uploadHeader(){
    axios.defaults.headers[_Authorization] = getToken();
    axios.defaults.headers[_UserID] = getUserID();
    return axios.defaults.headers;
}

export default { post, get, ajax, init, toLogin, uploadHeader, uploadFile}
