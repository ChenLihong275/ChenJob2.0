// 1、注册点击事件
// 2、获取表单值
// 3、判断数据，校验
// 4、发送请求
// 5、显示弹窗
document.querySelector('#btn-register').addEventListener('click', async function () {
  const { username, password } = serialize(document.querySelector('.register-form'), { hash: true, empty: true })
  if (!/^[\w-]{8,30}$/.test(username)) {
    return toastShow('用户名8-30位')
  }
  if (!/^[\w-]{6,30}$/.test(password)) {
    return toastShow('密码6-30位')
  }
  try {
    const res = await axios.post('/register', { username, password })
    toastShow(res.data.message)
  } catch (error) {
    toastShow(error.response.data.message)
  }
})
