import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingDoughnutChart = () => {
	const labelIcons = {
    Other: "💡",
    Shopping: "🛍️",
    Entertainment: "🎬",
    Healthcare: "💊",
    Groceries: "🛒",
    Utilities: "💡",
    Transportation: "🚗",
    Dining: "🍽️",
  };
  const data = {
    labels: [
      "Other",
      "Shopping",
      "Entertainment",
      "Healthcare",
      "Groceries",
      "Utilities",
      "Transportation",
      "Dining",
    ],
    datasets: [
      {
        label: "Spending by Category",
        data: [300, 50, 100, 50, 120, 300, 300, 100],
        backgroundColor: [
          "rgb(70,159,220)",   // Blue
          "rgb(225,118,51)",   // Orange
          "rgb(91,186,102)",   // Green
          "rgb(218,87,151)",   // Pink
          "rgb(131,100,238)",  // Purple
          "rgb(222,82,76)",    // Red
          "rgb(226,180,63)",   // Yellow
          "rgb(98,107,233)",   // Indigo
        ],
        hoverOffset: 4,
      },
    ],
  };

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
          },
          generateLabels: (chart) => {
            const original = ChartJS.overrides.doughnut.plugins.legend.labels.generateLabels(chart);
            return original.map((label) => ({
              ...label,
              text: `${labelIcons[label.text] || ""} ${label.text}`, // add emoji before label text
            }));
          },
        },
      },
    },
  };

  return (
		<div className="w-full p-4 bg-[rgb(251,252,253)] rounded-lg shadow-md mt-6">
			<div className="flex items-center mb-4">
				<FontAwesomeIcon icon={faChartPie} />
				<h2 className="text-left font-bold ml-2">Spending by Category</h2>
			</div>
			<div className="max-w-md mx-auto w-full">
				<Doughnut data={data} options={options} />
			</div>
		</div>
  );
};

export default SpendingDoughnutChart;
