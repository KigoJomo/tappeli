'use client'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | null
  startIcon?: React.ReactNode
  containerClass?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, startIcon, className, containerClass, ...props }, ref) => {
    return (
      <div className={`w-full space-y-1 ${containerClass}`}>
        {label && (
          <label className="block text-sm font-medium capitalize">
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80">
              {startIcon}
            </div>
          )}
          
            <input
            ref={ref}
            className={`
              w-full rounded-full border border-foreground-light outline-none px-4 py-2 bg-transparent
              focus:outline-none focus:border-accent
              disabled:cursor-not-allowed disabled:border-foreground-faded
              ${startIcon ? 'pl-10' : 'pl-4'}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${className || ''}
              transition-all duration-300
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }