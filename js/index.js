// 未登录无法打开页面
permissonControl('login.html')
// 渲染首页用户名
renderUsername()
// 点击退出跳转至登录页
logout('login.html')
// 进入页面渲染
async function render() {
  const res = await axios({ url: '/dashboard' })
  const { overview, year } = res.data
  renderHeaderData(overview)
  renderYear(year)
}
render()
function renderHeaderData(overview) {
  Object.keys(overview).forEach(key => (document.querySelector(`.${key}`).innerHTML = overview[key]))
}
function renderYear(year) {
  const myLine = echarts.init(document.querySelector('#line'))
  const option = {
    title: {
      text: '2023年全年薪资走势',
      left: 10,
      top: 15,
    },
    // 图表整体位置
    grid: {
      top: '20%',
    },
    yAxis: {
      // type为数据类型，value指数值轴
      type: 'value',
      // Y轴的分隔线类型设置
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ebeff6',
        },
      },
    },
    xAxis: {
      // type为数据类型，category指类目轴（指一些不连续，离散的数据）
      type: 'category',
      data: year.map(ele => ele.month),
      axisLine: {
        // X轴线类型设置
        lineStyle: {
          color: '#aeaeae',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        data: year.map(ele => ele.salary),
        // type类型为line指折线图
        type: 'line',
        // 标记点的大小
        symbolSize: 10,
        // 线样式修改
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#479dee', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#5c75f0', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          width: 5,
          join: 'round',
        },
        areaStyle: {
          // 使用渐变色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#b2d7f7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255,255,255,0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        smooth: 0.5,
      },
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
    },
  }
  myLine.setOption(option)
}
