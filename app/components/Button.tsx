import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  className?: string;
  secondary?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  secondary,
  icon,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${className} ${
        secondary
          ? 'btn-secondary bg-transparent'
          : 'bg-accent text-foreground hover:bg-accent-dark'
      } ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-full px-8 py-2 flex items-center justify-center gap-2`}>
      {icon && <span className="">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
