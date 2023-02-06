import { useRef, useEffect, useMemo } from 'react'

// 思路：为了实现echarts图表的响应式，我们监听浏览器resize事件，当浏览器resize时我们调用chart.resize()重绘图表。
// 因为浏览器resize触发很频繁，那么chart.resize()也会跟着频繁重绘。为了性能优化，我们添加防抖！
import { debounce } from '@/utils'
// import { useDebounce } from 'ahooks'

// 因为echart是DOM图表，一定要封装
// 图表开发的难点：异步数据处理！！
export default () => {
  const ref = useRef()

  const options = useMemo(()=>{
    // 对后端数据进行处理
    const expectedData = [100, 120, 161, 134, 105, 160, 165]
    const actualData = [120, 82, 91, 154, 162, 140, 145]
    // 返回echarts要的配置选项
    return {
      backgroundColor: 'white',
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding: [5, 10]
      },
      yAxis: {
        axisTick: {
          show: false
        }
      },
      legend: {
        data: ['expected', 'actual']
      },
      series: [{
        name: 'expected', itemStyle: {
          normal: {
            color: '#FF005A',
            lineStyle: {
              color: '#FF005A',
              width: 2
            }
          }
        },
        smooth: true,
        type: 'line',
        data: expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#3888fa',
            lineStyle: {
              color: '#3888fa',
              width: 2
            },
            areaStyle: {
              color: '#f3f8ff'
            }
          }
        },
        data: actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }]
    }
  }, [])

  useEffect(()=>{
    // 当options处理好后，渲染echarts图表
    const chart = echarts.init(ref.current)
    chart.setOption(options)
    // 监听浏览器的resize事件
    const handler = debounce(()=>{ chart.resize() }, 100)
    window.addEventListener('resize', handler)
    // 清除副作用
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return (
    <div ref={ref} style={{width: '100%', height: '350px'}} />
  )
}
