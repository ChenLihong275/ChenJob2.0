// 未登录无法打开页面
permissonControl('login.html')
// 渲染首页用户名
renderUsername()
// 点击退出跳转至登录页
logout('login.html')
// 进入页面渲染
async function render() {
  const res = await axios({ url: '/dashboard' })
  const { overview, year, salaryData, groupData } = res.data
  renderHeaderData(overview)
  renderYear(year)
  renderSalary(salaryData)
  renderGroupData(groupData)
}
render()
function renderHeaderData(overview) {
  Object.keys(overview).forEach(key => (document.querySelector(`.${key}`).innerHTML = overview[key]))
}
function renderYear(year) {
  const myChart = echarts.init(document.querySelector('#line'))
  const option = {
    // 标题抬头
    title: {
      text: '2023年全年薪资走势',
      left: 10,
      top: 15,
    },
    // 图表整体位置
    grid: {
      top: '20%',
    },
    // y轴
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
    // x轴
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
    // 系列列表
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
    // 提示框组件
    tooltip: {
      show: true,
      trigger: 'axis',
    },
  }
  myChart.setOption(option)
}
function renderSalary(salaryData) {
  const myChart = echarts.init(document.querySelector('#salary'))
  const option = {
    title: {
      text: '班级薪资分布',
      top: 10,
      left: 15,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '5%',
      left: 'center',
    },
    series: [
      {
        name: '班级薪资分布',
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 20,
          borderColor: '#fff',
          borderWidth: 2,
        },
        // 文本标签
        label: {
          show: false,
          position: 'center',
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold',
        //   },
        // },
        // 文本标签指引线
        labelLine: {
          show: false,
        },
        data: salaryData.map(ele => {
          return {
            name: ele.label,
            value: ele.b_count + ele.g_count,
          }
        }),
      },
    ],
    color: ['skyblue', 'red', 'yellow', 'blue'],
  }
  myChart.setOption(option)
}
function renderGroupData(groupData) {
  console.log(groupData)
  console.log(groupData[1])
  const myChart = echarts.init(document.querySelector('#lines'))
  const option = {
    legend: {
      type: 'plain',
    },
    tooltip: {},
    dataset: {
      dimensions: ['product', '期望薪资', '实际薪资'],
      source: groupData[1].map(ele => {
        return { product: ele.name, 期望薪资: ele.hope_salary, 实际薪资: ele.salary }
      }),
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }],
  }
  myChart.setOption(option)
}
