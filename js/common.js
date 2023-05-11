function toastShow(msg) {
  const toast = new bootstrap.Toast(document.querySelector('.my-toast'))
  document.querySelector('.toast-body').innerHTML = msg
  toast.show()
}
axios.defaults.baseURL = 'https://hmajax.itheima.net'
// 添加公共函数，判断有无token
function permissonControl(url) {
  if (localStorage.getItem('token')) return
  toastShow('请先登录')
  setTimeout(() => (location.href = url), 1500)
}
// 渲染用户名公共函数
function renderUsername() {
  document.querySelector('.username').innerHTML = localStorage.getItem('username')
}
// 点击退出之后移除本地存储
function logout(url) {
  document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    location.href = url
  })
}
// axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log(config)
    // 在发送请求之前做些什么
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.dir(error)
    return Promise.reject(error)
  }
)
