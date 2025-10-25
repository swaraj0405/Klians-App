import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = '', icon, endIcon, onEndIconClick, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">{icon}</div>}
          <input
            id={id}
            ref={ref}
            className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 dark:text-slate-200 transition-colors duration-200 ${icon ? 'pl-10' : ''} ${endIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {endIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
              aria-label="Toggle password visibility"
            >
              {endIcon}
            </button>
          )}
        </div>
      </div>
    );
  }
);