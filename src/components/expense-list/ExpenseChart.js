import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { categories } from "../../constants/add-expense";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const getCategoryTotal = () => {
    const categoryTotals = {};
    categories.forEach((cat) => {
      categoryTotals[cat.title] = 0;
    });

    expenses.forEach((expense) => {
      categoryTotals[expense.category.title] += expense.amount;
    });

    return categoryTotals;
  };

  const categoryTotals = getCategoryTotal();

  // Create labels with category name and amount
  const labels = Object.entries(categoryTotals).map(
    ([category, amount]) => `${category}: ₹${amount.toFixed(2)}`
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: categories.map((cat) => cat.color),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `Amount: ₹${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Calculate grand total
  const grandTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="expense-chart">
      <h3>Expense Distribution (Total: ₹{grandTotal.toFixed(2)})</h3>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExpenseChart;
