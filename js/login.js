// 1、注册点击事件
// 2、获取表单值
// 3、数据判断
// 4、发送请求
// 5、弹窗显示
// 6、页面跳转
document.querySelector('#btn-login').addEventListener('click', async function () {
  const { username, password } = serialize(document.querySelector('.login-form'), { hash: true, empty: true })
  if (!/^\w{8,30}$/.test(username)) {
    return toastShow('用户名8-30位')
  }
  if (!/^\w{6,30}$/.test(password)) {
    return toastShow('密码6-30位')
  }
  try {
    const res = await axios.post('/login', { username, password })
    toastShow(res.data.message)
    localStorage.setItem('username', res.data.data.username)
    localStorage.setItem('token', res.data.data.token)
    setTimeout(() => (location.href = 'index.html'), 1500)
  } catch (error) {
    toastShow(error.response.data.message)
  }
})
