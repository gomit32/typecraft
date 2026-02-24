import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './ProgressChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ProgressChart = ({ history }) => {
  const last20 = history.slice(-20);

  const data = {
    labels: last20.map((_, i) => `Test ${i + 1}`),
    datasets: [
      {
        label: 'WPM',
        data: last20.map(h => h.wpm),
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108, 99, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6c63ff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Accuracy',
        data: last20.map(h => h.accuracy),
        borderColor: '#2ed573',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2ed573',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9999bb',
          font: { family: 'Inter' }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#666688' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#666688' }
      }
    }
  };

  return (
    <div className="progress-chart">
      <h3 className="chart-title">📈 Progress Over Time</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressChart;