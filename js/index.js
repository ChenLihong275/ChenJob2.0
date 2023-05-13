// 未登录无法打开页面
permissonControl('login.html')
// 渲染首页用户名
renderUsername()
// 点击退出跳转至登录页
logout('login.html')
// 进入页面渲染
async function render() {
  const res = await axios({ url: '/dashboard' })
  const { overview } = res

  renderHeaderData(overview)
}
render()
function renderHeaderData(overview) {
  Object.keys(overview).forEach(key => (document.querySelector(`.${key}`).innerHTML = overview[key]))
}
const line = echarts.init(document.querySelector('#line'))
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {},
    },
  ],
}
