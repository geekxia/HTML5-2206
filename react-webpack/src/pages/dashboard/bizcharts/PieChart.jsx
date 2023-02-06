import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Legend,
  View,
  Annotation,
} from "bizcharts"

import DataSet from "@antv/data-set"

export default () => {

  const text = [
      "MIDNIGHT",
      "3 AM",
      "6 AM",
      "9 AM",
      "NOON",
      "3 PM",
      "6 PM",
      "9 PM"
    ];
    const data = [];

    for (let i = 0; i < 24; i++) {
      const item = {};
      item.type = i + "";
      item.value = 10;
      data.push(item);
    }

    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "value",
      dimension: "type",
      as: "percent"
    });
    const userData = [
      { type: '睡觉', value: 30 },
      { type: '晨练', value: 5 },
			{ type: '上班', value: 40 },
			{ type: '亲子互动', value: 5 },
			{ type: '辅导作业', value: 5 },
			{ type: '练球&瑜伽', value: 5 },
			{ type: '洗澡', value: 5 },
			{ type: '阅读充电', value: 5 },
    ];
    const userDv = new DataView();
    userDv.source(userData).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          return (val * 100).toFixed(2) + "%";
        }
      },
      value: {
        formatter: val => {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };

  return (
    <Chart placeholder={false} height={380} padding={[40,25,20,50]} autoFit>
       <Legend visible={false} />
       {/* 背景图层 */}
       <View data={dv.rows}>
         <Legend visible={false} />
         <Tooltip shared showTitle={false} />
         <Coordinate type="theta" innerRadius={0.9} />
         <Interval
           position="percent"
           adjust="stack"
           color={['type', ['rgba(255, 255, 255, 0)']]}
           style={{
             stroke: '#444',
             lineWidth: 1,
           }}
           tooltip={false}
         />
         <Annotation.Text
           position={['50%', '40%']}
           content="Dream"
           style={{
             lineHeight: '240px',
             fontSize: '30',
             fill: '#262626',
             textAlign: 'center',
           }}
         />
         <Annotation.Text
           position={['50%', '60%']}
           content="24hours"
           style={{
             lineHeight: '240px',
             fontSize: '30',
             fill: '#262626',
             textAlign: 'center',
           }}
         />
       </View>
       <View data={data}>
         <Axis visible={false} />
         <Coordinate type="polar" innerRadius={0.9} />
         <Interval
           position="type*value"
           color="#444"
           label={['type',
           (val) => {
             return {
               content: val % 3 === 0 ? text[val / 3] : '',
             };
           },
           {
             offset: 15,
             style: {
               fontSize: 12,
               fontWeight: 'bold',
               fill: '#bfbfbf',
             },
           }]}
           tooltip={false}
           size={['type', (val) => {
             if (val % 3 === 0) {
               return 4;
             }
             return 1;
           }]}
         />
       </View>
       {/* 绘制图形 */}
       <View data={userDv.rows} scale={{
         percent: {
           formatter: (val) => {
               return (val * 100).toFixed(2) + '%';
             },
         }
       }}>
         <Coordinate type="theta" innerRadius={0.75} />
         <Interval
           position="percent"
           adjust="stack"
           color="type"
           label={['type', {offset: 40}]}
         />
       </View>
    </Chart>
  )
}
