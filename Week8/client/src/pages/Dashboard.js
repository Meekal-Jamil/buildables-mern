import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format, subMonths, addMonths } from 'date-fns';
import ExpenseChart from '../components/ExpenseChart';
import RecentTransactions from '../components/RecentTransactions';
import TrendsChart from '../components/TrendsChart';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const currentMonth = selectedDate.getMonth() + 1;
  const currentYear = selectedDate.getFullYear();

  const { data: dashboardData, isLoading, error } = useQuery(
    ['dashboard', currentMonth, currentYear],
    async () => {
      const response = await axios.get(`/dashboard/summary?month=${currentMonth}&year=${currentYear}`);
      return response.data.summary;
    }
  );

  const goToPreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const goToCurrentMonth = () => {
    setSelectedDate(new Date());
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return selectedDate.getMonth() === now.getMonth() && 
           selectedDate.getFullYear() === now.getFullYear();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger-600">Error loading dashboard data</div>;

  const { 
    totalIncome = 0, 
    totalExpenses = 0, 
    balance = 0,
    expensesByCategory = {},
    recentTransactions = []
  } = dashboardData || {};

  // Check if there's any data for the selected month
  const hasData = totalIncome > 0 || totalExpenses > 0 || recentTransactions.length > 0;

  const StatCard = ({ title, amount, icon: Icon, type, trend }) => {
    const isPositive = type === 'income' || (type === 'balance' && balance >= 0);
    const colorClass = type === 'income' ? 'text-success-600' : 
                      type === 'expense' ? 'text-danger-600' : 
                      balance >= 0 ? 'text-success-600' : 'text-danger-600';
    
    const bgClass = type === 'income' ? 'bg-success-100' : 
                   type === 'expense' ? 'bg-danger-100' : 
                   balance >= 0 ? 'bg-success-100' : 'bg-danger-100';

    return (
      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${colorClass}`}>
              ${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            {trend && (
              <div className="flex items-center mt-2">
                {isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-success-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-danger-600 mr-1" />
                )}
                <span className={`text-sm ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
                  {trend}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${bgClass}`}>
            <Icon className={`h-6 w-6 ${colorClass}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" />
            Analytics for {format(selectedDate, 'MMMM yyyy')}
            {!isCurrentMonth() && (
              <span className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                Historical
              </span>
            )}
          </p>
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center space-x-2">
          {/* Quick Month Selector */}
          <select
            value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, 1));
            }}
            className="input-field text-sm mr-2"
          >
            {/* Generate options for the last 2 years and next year */}
            {Array.from({ length: 36 }, (_, i) => {
              const date = subMonths(new Date(), 24 - i);
              const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
              const label = format(date, 'MMMM yyyy');
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>

          {/* Navigation Buttons */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg">
            <button
              onClick={goToPreviousMonth}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors duration-200"
              title="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={goToCurrentMonth}
              disabled={isCurrentMonth()}
              className={`px-3 py-2 text-sm border-x border-gray-300 transition-colors duration-200 ${
                isCurrentMonth()
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-primary-50 cursor-pointer'
              }`}
              title="Go to current month"
            >
              Today
            </button>
            
            <button
              onClick={goToNextMonth}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
              title="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          amount={totalIncome}
          icon={TrendingUp}
          type="income"
        />
        <StatCard
          title="Total Expenses"
          amount={totalExpenses}
          icon={TrendingDown}
          type="expense"
        />
        <StatCard
          title="Current Balance"
          amount={balance}
          icon={Wallet}
          type="balance"
        />
      </div>

      {/* No Data Message */}
      {!hasData && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No data for {format(selectedDate, 'MMMM yyyy')}
          </h3>
          <p className="text-gray-500 mb-4">
            You don't have any transactions recorded for this month.
          </p>
          {!isCurrentMonth() && (
            <button
              onClick={goToCurrentMonth}
              className="btn-primary text-sm"
            >
              Go to Current Month
            </button>
          )}
        </div>
      )}

      {/* Charts and Recent Transactions */}
      {hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Expenses by Category - {format(selectedDate, 'MMM yyyy')}
            </h3>
            <ExpenseChart data={expensesByCategory} />
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transactions - {format(selectedDate, 'MMM yyyy')}
            </h3>
            <RecentTransactions transactions={recentTransactions} />
          </div>
        </div>
      )}

      {/* Trends Chart */}
      <TrendsChart />
    </div>
  );
};

export default Dashboard;