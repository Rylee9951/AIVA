import React from "react";
import { TrendingUp } from 'lucide-react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register components with Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const CashFlowChart = () => {
  const data = [
    { date: "July 23", income: 0, expenses: 80, net: -80 },
    { date: "July 24", income: 0, expenses: 65, net: -65 },
    { date: "July 25", income: 200, expenses: 30, net: 170 },
    { date: "July 26", income: 0, expenses: 40, net: -40 },
    { date: "July 27", income: 0, expenses: 90, net: -90 },
    { date: "July 28", income: 0, expenses: 55, net: -55 },
    { date: "July 29", income: 0, expenses: 45, net: -45 },
    { date: "July 30", income: 0, expenses: 62, net: -62 },
    { date: "July 31", income: 2000, expenses: 250, net: 1750 },
    { date: "August 01", income: 0, expenses: 55, net: -55 },
    { date: "August 02", income: 0, expenses: 60, net: -60 },
    { date: "August 03", income: 0, expenses: 35, net: -35 },
    { date: "August 04", income: 0, expenses: 80, net: -80 },
    { date: "August 05", income: 0, expenses: 65, net: -65 },
    { date: "August 06", income: 0, expenses: 90, net: -90 },
    { date: "August 07", income: 0, expenses: 120, net: -120 },
    { date: "August 08", income: 0, expenses: 70, net: -70 },
    { date: "August 09", income: 0, expenses: 40, net: -40 },
    { date: "August 10", income: 0, expenses: 50, net: -50 },
    { date: "August 11", income: 0, expenses: 30, net: -30 },
    { date: "August 12", income: 0, expenses: 35, net: -35 },
    { date: "August 13", income: 0, expenses: 65, net: -65 },
    { date: "August 14", income: 0, expenses: 85, net: -85 },
    { date: "August 15", income: 0, expenses: 60, net: -60 },
    { date: "August 16", income: 0, expenses: 40, net: -40 },
    { date: "August 17", income: 0, expenses: 32, net: -32 },
    { date: "August 18", income: 500, expenses: 50, net: 450 },
    { date: "August 19", income: 0, expenses: 75, net: -75 },
    { date: "August 20", income: 0, expenses: 68, net: -68 },
    { date: "August 21", income: 0, expenses: 62, net: -62 },
  ];

  const chartData = {
    labels: data.map((d) => d.date), // Dates for X-axis
    datasets: [
      {
        label: "Income",
        data: data.map((d) => d.income),
        borderColor: "rgb(70,159,220)",
        backgroundColor: "rgba(70,159,220,0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: "Expenses",
        data: data.map((d) => d.expenses),
        borderColor: "rgb(222,82,76)",
        backgroundColor: "rgba(222,82,76,0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: "Net",
        data: data.map((d) => d.net),
        borderColor: "rgb(91,186,102)",
        backgroundColor: "rgba(91,186,102,0.2)",
        tension: 0.3,
        pointRadius: 4,
        borderDash: [5, 5], // makes net line dashed
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true, // circles instead of rectangles
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Income vs Expenses vs Net",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
		<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
			<div className="flex items-center mb-4">
				<TrendingUp className="w-5 h-5 text-emerald-600" />
				<h2 className="text-left font-bold ml-2">Cash Flow (30 days)</h2>
			</div>
			<div className="mx-auto w-full">
				<Line data={chartData} options={options} />
			</div>
		</div>
	) 
};

export default CashFlowChart;
