import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Lock, Eye, EyeOff, Save, UserCheck, Shield } from 'lucide-react';
import PasswordStrength from '../components/PasswordStrength';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm({
    defaultValues: {
      name: user?.name || ''
    }
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    watch,
    reset: resetPassword
  } = useForm();

  const newPassword = watch('newPassword');

  // Update profile mutation
  const updateProfileMutation = useMutation(
    (profileData) => axios.put('/auth/profile', profileData),
    {
      onSuccess: (response) => {
        updateUser(response.data.user);
        toast.success('Profile updated successfully');
        resetProfile({ name: response.data.user.name });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update profile');
      }
    }
  );

  // Update password mutation
  const updatePasswordMutation = useMutation(
    (passwordData) => axios.put('/auth/password', passwordData),
    {
      onSuccess: () => {
        toast.success('Password updated successfully');
        resetPassword();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update password');
      }
    }
  );

  const onSubmitProfile = (data) => {
    updateProfileMutation.mutate(data);
  };

  const onSubmitPassword = (data) => {
    updatePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                Profile Settings
              </div>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'password'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Profile Settings Tab */}
      {activeTab === 'profile' && (
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <p className="text-gray-600">Update your personal information</p>
            </div>
          </div>

          <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  {...registerProfile('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name cannot exceed 50 characters'
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Name can only contain letters and spaces'
                    }
                  })}
                  className={`input-field pl-12 ${
                    profileErrors.name ? 'border-danger-300 focus:border-danger-500' : ''
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {profileErrors.name && (
                <p className="mt-1 text-sm text-danger-600">{profileErrors.name.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Only letters and spaces are allowed. Numbers and special characters are not permitted.
              </p>
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="input-field bg-gray-50 text-gray-500 cursor-not-allowed"
                  placeholder="Email cannot be changed"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Email address cannot be changed for security reasons.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateProfileMutation.isLoading}
                className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {updateProfileMutation.isLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Password Settings Tab */}
      {activeTab === 'password' && (
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-danger-600 rounded-full flex items-center justify-center mr-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              <p className="text-gray-600">Change your password to keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  {...registerPassword('currentPassword', {
                    required: 'Current password is required'
                  })}
                  className={`input-field pl-12 pr-12 ${
                    passwordErrors.currentPassword ? 'border-danger-300 focus:border-danger-500' : ''
                  }`}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-sm text-danger-600">{passwordErrors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  {...registerPassword('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)'
                    }
                  })}
                  className={`input-field pl-12 pr-12 ${
                    passwordErrors.newPassword ? 'border-danger-300 focus:border-danger-500' : ''
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="mt-1 text-sm text-danger-600">{passwordErrors.newPassword.message}</p>
              )}
              
              {/* Password Strength Indicator */}
              <PasswordStrength password={newPassword} />
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...registerPassword('confirmPassword', {
                    required: 'Please confirm your new password',
                    validate: value => value === newPassword || 'Passwords do not match'
                  })}
                  className={`input-field pl-12 pr-12 ${
                    passwordErrors.confirmPassword ? 'border-danger-300 focus:border-danger-500' : ''
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-danger-600">{passwordErrors.confirmPassword.message}</p>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <div className="flex">
                <Shield className="h-5 w-5 text-warning-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-warning-800">Password Security Tips</h3>
                  <div className="mt-2 text-sm text-warning-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Use a unique password that you don't use elsewhere</li>
                      <li>Make it at least 8 characters long</li>
                      <li>Include uppercase, lowercase, numbers, and symbols</li>
                      <li>Avoid using personal information like names or dates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updatePasswordMutation.isLoading}
                className="bg-danger-600 hover:bg-danger-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Lock className="h-4 w-4 mr-2" />
                {updatePasswordMutation.isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;