import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const TrendsChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  const { data: trendsResponse, isLoading } = useQuery(
    ['trends', timeRange],
    async () => {
      const response = await axios.get(`/dashboard/trends?range=${timeRange}`);
      return response.data;
    }
  );

  if (isLoading || !trendsResponse) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const { trends = [], categories = [] } = trendsResponse;

  // Process the trends data to create monthly data
  const monthlyDataMap = {};
  
  trends.forEach(item => {
    const monthKey = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`;
    const monthLabel = new Date(item._id.year, item._id.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!monthlyDataMap[monthKey]) {
      monthlyDataMap[monthKey] = {
        month: monthLabel,
        income: 0,
        expenses: 0
      };
    }

    if (item._id.type === 'income') {
      monthlyDataMap[monthKey].income = item.total;
    } else {
      monthlyDataMap[monthKey].expenses = item.total;
    }
  });

  const monthlyData = Object.values(monthlyDataMap).sort((a, b) => {
    return new Date(a.month) - new Date(b.month);
  });

  // Use real categories data from API instead of mock data
  const realCategories = categories.length > 0 ? categories : [
    { name: 'No Data Available', amount: 0 }
  ];

  // Prepare data for line chart (monthly trends)
  const lineChartData = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(item => item.income),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(item => item.expenses),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Net',
        data: monthlyData.map(item => item.income - item.expenses),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false,
      }
    ]
  };

  // Prepare data for bar chart (category comparison)
  const barChartData = {
    labels: realCategories.map(cat => cat.name),
    datasets: [
      {
        label: 'Amount Spent',
        data: realCategories.map(cat => cat.amount),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(251, 146, 60, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Prepare data for doughnut chart
  const doughnutChartData = {
    labels: realCategories.map(cat => cat.name),
    datasets: [
      {
        data: realCategories.map(cat => cat.amount),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(251, 146, 60, 1)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(context.parsed.y || context.parsed);
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: chartType !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            }).format(value);
          }
        }
      }
    } : undefined
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={lineChartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={barChartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={doughnutChartData} options={chartOptions} />;
      default:
        return <Line data={lineChartData} options={chartOptions} />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Financial Trends</h3>
        
        <div className="flex space-x-4">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>

          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'line' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Line Chart"
            >
              <TrendingUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'bar' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Bar Chart"
            >
              <BarChart3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType('doughnut')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                chartType === 'doughnut' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Doughnut Chart"
            >
              <PieChart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        {(chartType === 'line' && monthlyData.length === 0) || 
         ((chartType === 'bar' || chartType === 'doughnut') && realCategories.length === 0) ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <TrendingUp className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-500">
                {chartType === 'line' 
                  ? 'Add some transactions to see your financial trends over time.'
                  : 'Add some expense transactions to see category breakdown.'
                }
              </p>
            </div>
          </div>
        ) : (
          renderChart()
        )}
      </div>

      {/* Chart Insights */}
      {chartType === 'line' && monthlyData.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success-50 p-4 rounded-lg">
            <p className="text-sm text-success-600 font-medium">Avg Monthly Income</p>
            <p className="text-lg font-bold text-success-700">
              ${(monthlyData.reduce((sum, item) => sum + item.income, 0) / monthlyData.length).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-danger-50 p-4 rounded-lg">
            <p className="text-sm text-danger-600 font-medium">Avg Monthly Expenses</p>
            <p className="text-lg font-bold text-danger-700">
              ${(monthlyData.reduce((sum, item) => sum + item.expenses, 0) / monthlyData.length).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-primary-50 p-4 rounded-lg">
            <p className="text-sm text-primary-600 font-medium">Avg Monthly Savings</p>
            <p className="text-lg font-bold text-primary-700">
              ${(monthlyData.reduce((sum, item) => sum + (item.income - item.expenses), 0) / monthlyData.length).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}

      {/* Category Chart Info */}
      {(chartType === 'bar' || chartType === 'doughnut') && realCategories.length > 0 && (
        <div className="mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Top Expense Categories ({timeRange.replace('months', ' months')})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {realCategories.slice(0, 6).map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${category.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Total categories: {realCategories.length} | 
              Total spent: ${realCategories.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsChart;