// components/SpiderChart.tsx
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface SpiderChartProps {
  x1: number
  x2: number
  x3: number
  x4: number
  x5: number
  x6: number
}

const SpiderChart: React.FC<SpiderChartProps> = ({ x1, x2, x3, x4, x5, x6 }) => {
  const data = {
    labels: ['AmountOfIKS', 'AmountOfUser', 'AmountOfProdperUser', 'AmountOfSMSperSec', 'Bandwidth', 'SMS Response Time'],
    datasets: [
      {
        data: [x1, x2 / 5, x3 / 10, x4 / 1000, x5, x6],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  }
    
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          borderWidth: 4,
        },
        suggestedMin: 0,
        suggestedMax: 6,
        ticks: {
          stepSize: 1,
          font: {
            size: 18,
            color: 'red',
          },
        },
        pointLabels: {
          font: {
            size: 20,
            color: 'red',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default SpiderChart