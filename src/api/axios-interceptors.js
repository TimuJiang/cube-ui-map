import axios from 'axios'
import QS from 'qs'

let token = ''
axios.interceptors.request.use(config => {
  if (localStorage.getItem('dv-csrftoken')) {
    config.headers['x-csrf-token'] = localStorage.getItem('dv-csrftoken')
  }
  if (config.method === 'post') {
    config.data = QS.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(response => {
  if (response.headers['x-csrf-token']) {
    token = response.headers['x-csrf-token']
    localStorage.setItem('dv-csrftoken', token)
  }
  let code = response.data.code
  if (code === 'user-not-login') {
    let url = response.data.data || ''
    let tagert = window.location.href
    let baseUrl = url.split('&')[0]
    window.location.href = baseUrl + '&redirectUrl=' + tagert
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default axios
