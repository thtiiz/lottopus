import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { FC, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const baseOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    // title: {
    //   display: false,
    //   text: 'Chart.js Bar Chart',
    // },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
interface IHistogramChartProps {
  labels: number[];
  data: number[];
}

export const HistogramChart: FC<IHistogramChartProps> = ({ labels, data }) => {
  const barData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: 'Lotto',
          data: data,
          backgroundColor: 'rgba(119, 108, 233, 0.5)',
        },
      ],
    };
  }, [labels, data]);
  return <Bar options={baseOptions} data={barData} />;
};
