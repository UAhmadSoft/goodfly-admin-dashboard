import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Reservations',
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: 'Orders',
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    options: {
      chart: {
        height: 200,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#15ab92'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      // title: {
      //   text: 'Average High & Low Temperature',
      //   align: 'left',
      // },
      grid: {
        borderColor: '#f2f2f2',
        row: {
          colors: ['#f2f2f2', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      // markers: {
      //   size: 1,
      // },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Temperature',
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        // floating: true,
        // offsetY: -25,
        // offsetX: -5,
        show: true,
      },
    },
  });
  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type='line'
      height={350}
    />
  );
};

export default LineChart;
