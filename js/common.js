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
