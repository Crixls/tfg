
import ReactECharts from "echarts-for-react";


const GraficoBarras = ({ dataBar }) => {
    // Mapear los nombres de los meses y los valores
    const xAxisData = dataBar.map(({ name }) => name);
    const seriesData = dataBar.map(({ value }) => value);


    const colors = ['#5470C6', '#91CC75', '#EE6666'];
const option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data:xAxisData
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Cantidad ventas',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    }
    
  ],
  series: [
   
    {
        name: 'Ventas',
        type: 'bar',
        data: seriesData
      },
  ]
};

    return (
        <div>
            <ReactECharts option={option}></ReactECharts>
        </div>
    );
};

export default GraficoBarras;

