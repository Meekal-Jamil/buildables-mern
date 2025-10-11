import React from 'react';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No recent transactions</p>
        <p className="text-sm">Add your first transaction to get started</p>
      </div>
    );
  }

  const categoryLabels = {
    // Income categories
    salary: 'Salary',
    freelance: 'Freelance',
    investment: 'Investment',
    business: 'Business',
    gift: 'Gift',
    other_income: 'Other Income',
    // Expense categories
    food: 'Food & Dining',
    transportation: 'Transportation',
    housing: 'Housing',
    utilities: 'Utilities',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    shopping: 'Shopping',
    education: 'Education',
    travel: 'Travel',
    insurance: 'Insurance',
    other_expense: 'Other Expense'
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div 
          key={transaction._id} 
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              transaction.type === 'income' ? 'bg-success-100' : 'bg-danger-100'
            }`}>
              {transaction.type === 'income' ? (
                <ArrowUpRight className="h-4 w-4 text-success-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-danger-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.description}</p>
              <p className="text-sm text-gray-600">
                {categoryLabels[transaction.category] || transaction.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}$
              {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(transaction.date), 'MMM dd')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;