import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data?.map(d => d.year),
    datasets: [{
      label: 'Revenue',
      data: data?.map(d => d.revenue),
      borderColor: 'blue'
    }]
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
