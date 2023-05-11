// 未登录无法打开页面
permissonControl('login.html')
// 渲染首页用户名
renderUsername()
// 点击退出跳转至登录页
logout('login.html')
// 进入页面渲染
async function render() {
  const res = await axios({ url: '/dashboard' })
  const { overview } = res.data.data
  Object.keys(overview).forEach(key => (document.querySelector(`.${key}`).innerHTML = overview[key]))
}
render()
