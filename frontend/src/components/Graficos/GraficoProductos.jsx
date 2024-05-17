import ReactECharts from "echarts-for-react";

const GraficoProductos = ({dataProductos}) => {
    console.log(dataProductos);
    const xAxisData = dataProductos.map(({ name }) => name);
    const seriesData = dataProductos.map(({ value }) => value); 

    const option = {
        xAxis: {
          type: 'category',
          data: xAxisData,
          name: 'Id',
        },
        yAxis: {
          type: 'value',
          name: 'Cantidad', // Opcional: agregar nombre al eje

        },
        series: [
          {
            data: seriesData,
            type: 'line',
            smooth: true
          }
        ]
      };
    return (
        <div>
            <ReactECharts option={option}></ReactECharts>

        </div>
    )
}

export default GraficoProductos
