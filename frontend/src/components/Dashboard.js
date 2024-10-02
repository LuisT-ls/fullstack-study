import React from 'react'
import { Bar } from 'react-chartjs-2'
import styles from '../styles/Dashboard.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Dashboard() {
  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março'],
    datasets: [
      {
        label: 'Vendas',
        data: [65, 59, 80],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Relatório de Vendas'
      }
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          autoSkip: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Dashboard de Vendas</h2>
      <div className={styles.chartContainer}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default Dashboard
