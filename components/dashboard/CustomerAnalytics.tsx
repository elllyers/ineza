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

const CustomerAnalytics = () => {
  const data = {
    labels: ["New", "Returning", "Churned", "At Risk", "VIP"],
    datasets: [
      {
        label: "Customers",
        data: [1234, 2345, 456, 789, 567],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // blue
          "rgba(16, 185, 129, 0.8)", // green
          "rgba(239, 68, 68, 0.8)", // red
          "rgba(245, 158, 11, 0.8)", // amber
          "rgba(139, 92, 246, 0.8)", // purple
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { color: "rgb(156, 163, 175)" },
        grid: { color: "rgba(75, 85, 99, 0.2)" },
      },
      x: {
        ticks: { color: "rgb(156, 163, 175)" },
        grid: { color: "rgba(75, 85, 99, 0.2)" },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
      <h3 className="text-lg font-medium text-white mb-4">Customer Segments</h3>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomerAnalytics;
