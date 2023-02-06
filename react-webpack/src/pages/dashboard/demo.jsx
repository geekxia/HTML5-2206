
// 如何使用echarts图表？创建图表实例、配置图表选项、setOption()。

useEffect(()=>{
  // 1、实例化图表
  const chart = echarts.init(document.getElementById('main'))
  // 2、设置选项
  const options = {
    color: ['red', 'green', 'orange'],
    backgroundColor: 'rgb(255,255,255)',
    tooltip: {},
    title: {
      text: '上半年销售数据',
      textAlign: 'center',
      left: '50%',
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'pie'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      data: ['HTML5', 'Java', 'Python', '大数据', '测试'],
      position: 'bottom',
      name: '学科',
      nameTextStyle: {
        color: 'red'
      }
    },
    yAxis: {
      type: 'log'
    },
    series: [
      {
        data: [90, 1000, 150, 90, 70],
        type: 'line',
        name: '2020'
      },
      {
        data: [120, 2000, 150, 80, 70],
        type: 'line',
        name: '2021'
      },
      {
        data: [130, 260, 180, 80, 40],
        type: 'line',
        name: '2022'
      }
    ],
    legend: {
      top: 'center',
      left: 'right',
      orient: 'vertical'
    }
  }
  // 3、渲染图表
  chart.setOption(options)
}, [])
