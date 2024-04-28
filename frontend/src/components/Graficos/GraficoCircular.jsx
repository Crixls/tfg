
import ReactECharts from "echarts-for-react";

const GraficoCircular = ({ data }) => {
    // Inicializa un objeto para almacenar el recuento de cada idproduct

    const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      };
    


    return (
        <ReactECharts option={option}></ReactECharts>
    );
};

export default GraficoCircular;
