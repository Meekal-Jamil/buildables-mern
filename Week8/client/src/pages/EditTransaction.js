import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { ArrowLeft, DollarSign, Calendar, FileText, Tag, TrendingUp, TrendingDown, 
  Briefcase, Users, TrendingUp as Investment, Building, Gift, 
  UtensilsCrossed, Car, Home, Zap, Gamepad2, Heart, 
  ShoppingBag, GraduationCap, MapPin, Shield } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState('expense');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm();

  // Fetch existing transaction
  const { data: transactionData, isLoading: isLoadingTransaction, error } = useQuery(
    ['transaction', id],
    async () => {
      const response = await axios.get(`/transactions/${id}`);
      return response.data.transaction;
    },
    {
      enabled: !!id,
      onSuccess: (data) => {
        if (data) {
          // Set form values
          reset({
            type: data.type,
            amount: data.amount,
            description: data.description,
            category: data.category,
            date: format(new Date(data.date), 'yyyy-MM-dd')
          });
          setSelectedType(data.type);
        }
      }
    }
  );

  const watchType = watch('type');

  // Update selectedType when form type changes
  useEffect(() => {
    if (watchType) {
      setSelectedType(watchType);
      // Reset category when type changes
      setValue('category', '');
    }
  }, [watchType, setValue]);

  const updateTransactionMutation = useMutation(
    (transactionData) => axios.put(`/transactions/${id}`, transactionData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['transactions']);
        queryClient.invalidateQueries(['dashboard']);
        toast.success('Transaction updated successfully');
        navigate('/transactions');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update transaction');
      }
    }
  );

  const onSubmit = (data) => {
    updateTransactionMutation.mutate({
      ...data,
      amount: parseFloat(data.amount)
    });
  };

  const incomeCategories = [
    { value: 'salary', label: 'Salary', icon: Briefcase },
    { value: 'freelance', label: 'Freelance', icon: Users },
    { value: 'investment', label: 'Investment', icon: Investment },
    { value: 'business', label: 'Business', icon: Building },
    { value: 'gift', label: 'Gift', icon: Gift },
    { value: 'other_income', label: 'Other Income', icon: DollarSign }
  ];

  const expenseCategories = [
    { value: 'food', label: 'Food & Dining', icon: UtensilsCrossed },
    { value: 'transportation', label: 'Transportation', icon: Car },
    { value: 'housing', label: 'Housing', icon: Home },
    { value: 'utilities', label: 'Utilities', icon: Zap },
    { value: 'entertainment', label: 'Entertainment', icon: Gamepad2 },
    { value: 'healthcare', label: 'Healthcare', icon: Heart },
    { value: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { value: 'education', label: 'Education', icon: GraduationCap },
    { value: 'travel', label: 'Travel', icon: MapPin },
    { value: 'insurance', label: 'Insurance', icon: Shield },
    { value: 'other_expense', label: 'Other Expense', icon: DollarSign }
  ];

  const categories = selectedType === 'income' ? incomeCategories : expenseCategories;

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setValue('type', type);
    setValue('category', ''); // Reset category when type changes
  };

  if (isLoadingTransaction) return <LoadingSpinner />;
  if (error || !transactionData) {
    return (
      <div className="text-center py-12">
        <p className="text-danger-600 text-lg">Transaction not found</p>
        <button 
          onClick={() => navigate('/transactions')}
          className="btn-primary mt-4"
        >
          Back to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/transactions')}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Transaction</h1>
      </div>

      {/* Form */}
      <div className="card">
        {/* Selection Summary */}
        <div className={`mb-6 p-4 rounded-lg border-2 ${
          selectedType === 'income' 
            ? 'border-success-200 bg-success-50' 
            : 'border-danger-200 bg-danger-50'
        }`}>
          <div className="flex items-center justify-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedType === 'income' ? 'bg-success-500' : 'bg-danger-500'
            }`}>
              {selectedType === 'income' ? (
                <TrendingUp className="h-4 w-4 text-white" />
              ) : (
                <TrendingDown className="h-4 w-4 text-white" />
              )}
            </div>
            <span className={`text-lg font-semibold ${
              selectedType === 'income' ? 'text-success-700' : 'text-danger-700'
            }`}>
              Editing {selectedType === 'income' ? 'Income' : 'Expense'} Transaction
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-6">
              {/* Income Option */}
              <div
                onClick={() => handleTypeChange('income')}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedType === 'income'
                    ? 'border-success-500 bg-gradient-to-br from-success-50 to-success-100 shadow-lg shadow-success-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className={`mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedType === 'income' 
                      ? 'bg-success-500 shadow-lg transform scale-110' 
                      : 'bg-gray-400'
                  }`}>
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-lg font-semibold transition-colors duration-300 ${
                    selectedType === 'income' ? 'text-success-700' : 'text-gray-700'
                  }`}>
                    Income
                  </span>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    selectedType === 'income' ? 'text-success-600' : 'text-gray-500'
                  }`}>
                    Money coming in
                  </p>
                </div>
                {/* Hidden radio input for form validation */}
                <input
                  type="radio"
                  value="income"
                  {...register('type', { required: 'Transaction type is required' })}
                  className="sr-only"
                  checked={selectedType === 'income'}
                  onChange={() => {}}
                />
              </div>

              {/* Expense Option */}
              <div
                onClick={() => handleTypeChange('expense')}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedType === 'expense'
                    ? 'border-danger-500 bg-gradient-to-br from-danger-50 to-danger-100 shadow-lg shadow-danger-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className={`mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedType === 'expense' 
                      ? 'bg-danger-500 shadow-lg transform scale-110' 
                      : 'bg-gray-400'
                  }`}>
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-lg font-semibold transition-colors duration-300 ${
                    selectedType === 'expense' ? 'text-danger-700' : 'text-gray-700'
                  }`}>
                    Expense
                  </span>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    selectedType === 'expense' ? 'text-danger-600' : 'text-gray-500'
                  }`}>
                    Money going out
                  </p>
                </div>
                {/* Hidden radio input for form validation */}
                <input
                  type="radio"
                  value="expense"
                  {...register('type', { required: 'Transaction type is required' })}
                  className="sr-only"
                  checked={selectedType === 'expense'}
                  onChange={() => {}}
                />
              </div>
            </div>
            {errors.type && (
              <p className="mt-2 text-sm text-danger-600">{errors.type.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              {selectedType === 'income' ? 'Income' : 'Expense'} Amount
            </label>
            <div className="relative">
              <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                selectedType === 'income' ? 'text-success-400' : 'text-danger-400'
              }`} />
              <input
                type="number"
                id="amount"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than 0' }
                })}
                className={`input-field pl-10 ${
                  errors.amount 
                    ? 'border-danger-300 focus:border-danger-500' 
                    : selectedType === 'income' 
                      ? 'focus:border-success-500 focus:ring-success-500' 
                      : 'focus:border-danger-500 focus:ring-danger-500'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-danger-600">{errors.amount.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="description"
                placeholder="Enter transaction description"
                {...register('description', {
                  required: 'Description is required',
                  minLength: { value: 3, message: 'Description must be at least 3 characters' }
                })}
                className={`input-field pl-10 ${errors.description ? 'border-danger-300 focus:border-danger-500' : ''}`}
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-danger-600">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {selectedType === 'income' ? 'Income' : 'Expense'} Category
            </label>
            
            {/* Category Grid Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = watch('category') === category.value;
                return (
                  <div
                    key={category.value}
                    onClick={() => setValue('category', category.value)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? selectedType === 'income'
                          ? 'border-success-500 bg-success-50 shadow-md'
                          : 'border-danger-500 bg-danger-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`mx-auto mb-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? selectedType === 'income'
                            ? 'bg-success-500 text-white'
                            : 'bg-danger-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className={`text-xs font-medium transition-colors duration-300 ${
                        isSelected
                          ? selectedType === 'income'
                            ? 'text-success-700'
                            : 'text-danger-700'
                          : 'text-gray-700'
                      }`}>
                        {category.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hidden select for form validation */}
            <select
              {...register('category', { required: 'Category is required' })}
              className="sr-only"
              value={watch('category') || ''}
              onChange={() => {}}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-danger-600">{errors.category.message}</p>
            )}
            
            {/* Category Helper Text */}
            <div className="mt-2">
              <p className={`text-xs ${
                selectedType === 'income' ? 'text-success-600' : 'text-danger-600'
              }`}>
                {watch('category') 
                  ? `Selected: ${categories.find(c => c.value === watch('category'))?.label}`
                  : `Choose from ${categories.length} ${selectedType} categories available`
                }
              </p>
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                id="date"
                {...register('date', { required: 'Date is required' })}
                className={`input-field pl-10 ${errors.date ? 'border-danger-300 focus:border-danger-500' : ''}`}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-danger-600">{errors.date.message}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/transactions')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateTransactionMutation.isLoading}
              className={`flex-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                selectedType === 'income'
                  ? 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500'
                  : 'bg-danger-600 hover:bg-danger-700 text-white focus:ring-danger-500'
              }`}
            >
              {updateTransactionMutation.isLoading 
                ? 'Updating...' 
                : `Update ${selectedType === 'income' ? 'Income' : 'Expense'}`
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;