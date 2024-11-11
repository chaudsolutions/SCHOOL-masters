import { Bar, Line, Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ type, data, options }) => {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      default:
        return null;
    }
  };

  return <div>{renderChart()}</div>;
};

ChartComponent.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default ChartComponent;
