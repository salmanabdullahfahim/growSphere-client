import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CountChartProps {
  userData: number;
  postData: number;
  saleData: number;
}

const CountChart: React.FC<CountChartProps> = ({
  userData,
  postData,
  saleData,
}) => {
  const data = {
    labels: ["Users", "Posts", "Sales"],
    datasets: [
      {
        label: "Count",
        data: [userData, postData, saleData],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Users, Posts, and Sales Analytics ",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CountChart;
