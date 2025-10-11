import express from 'express';
import Transaction from '../models/Transaction.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
router.get('/summary', async (req, res) => {
  try {
    const { month, year } = req.query;
    
    // Default to current month if not provided
    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();
    
    // Create date range for the specified month
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

    // Get all transactions for the user in the specified month
    const transactions = await Transaction.find({
      user: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;

    // Get category breakdown for expenses
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    // Get income breakdown by category
    const incomeByCategory = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    // Get recent transactions (last 5)
    const recentTransactions = await Transaction.find({
      user: req.user._id
    })
    .sort({ date: -1 })
    .limit(5);

    res.json({
      success: true,
      summary: {
        totalIncome,
        totalExpenses,
        balance,
        month: targetMonth + 1,
        year: targetYear,
        transactionCount: transactions.length,
        expensesByCategory,
        incomeByCategory,
        recentTransactions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get monthly spending trends
// @route   GET /api/dashboard/trends
// @access  Private
router.get('/trends', async (req, res) => {
  try {
    const { range = '6months' } = req.query;
    
    // Calculate date range based on the parameter
    const currentDate = new Date();
    let startDate;
    
    switch (range) {
      case '3months':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
        break;
      case '12months':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);
        break;
      default: // 6months
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);
    }

    // Get monthly trends
    const trends = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Get category breakdown for expenses
    const categoryData = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: 'expense',
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 10
      }
    ]);

    // Format category data
    const categories = categoryData.map(cat => ({
      name: cat._id.charAt(0).toUpperCase() + cat._id.slice(1).replace('_', ' '),
      amount: cat.total,
      category: cat._id
    }));

    res.json({
      success: true,
      trends,
      categories,
      dateRange: {
        start: startDate,
        end: currentDate,
        range
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;