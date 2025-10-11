import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrength = ({ password }) => {
  const requirements = [
    {
      label: 'At least 8 characters',
      test: (pwd) => pwd.length >= 8
    },
    {
      label: '1 uppercase letter',
      test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      label: '1 lowercase letter', 
      test: (pwd) => /[a-z]/.test(pwd)
    },
    {
      label: '1 number',
      test: (pwd) => /\d/.test(pwd)
    },
    {
      label: '1 special character (@$!%*?&)',
      test: (pwd) => /[@$!%*?&]/.test(pwd)
    }
  ];

  const passedRequirements = requirements.filter(req => req.test(password || ''));
  const strength = passedRequirements.length;

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-200';
    if (strength <= 2) return 'bg-danger-500';
    if (strength <= 3) return 'bg-warning-500';
    if (strength <= 4) return 'bg-primary-500';
    return 'bg-success-500';
  };

  const getStrengthText = () => {
    if (strength === 0) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-700">Password Strength</span>
          <span className={`text-xs font-medium ${
            strength === 5 ? 'text-success-600' :
            strength >= 3 ? 'text-primary-600' :
            strength >= 1 ? 'text-warning-600' : 'text-danger-600'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const isPassed = requirement.test(password);
          return (
            <div key={index} className="flex items-center space-x-2">
              <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                isPassed ? 'bg-success-100 text-success-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {isPassed ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
              </div>
              <span className={`text-xs ${
                isPassed ? 'text-success-600' : 'text-gray-500'
              }`}>
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrength;