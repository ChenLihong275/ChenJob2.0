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
// 渲染首页用户名
function renderUsername() {
  document.querySelector('.username').innerHTML = localStorage.getItem('username')
}
