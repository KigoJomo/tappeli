import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  className?: string;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  secondary,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${className} ${
        secondary ? 'btn-secondary bg-transparent' : 'bg-accent text-foreground hover:bg-accent-dark'
      } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-full px-4 py-2`}>
      {label}
    </button>
  );
};

export default Button;
