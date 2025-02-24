import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  className?: string;
  secondary?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  secondary,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${className} ${
        secondary
          ? 'btn-secondary bg-transparent border border-accent focus:border-2 hover:gap-4'
          : 'bg-accent text-foreground hover:bg-accent-dark focus:outline-none focus:border-none'
      } ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } transition-all duration-300 rounded-full capitalize px-8 py-2 flex items-center justify-center gap-2`}>
      {icon && iconPosition === 'left' && <span className="">{icon}</span>}
      {label}
      {icon && iconPosition === 'right' && <span className="">{icon}</span>}
    </button>
  );
};

export default Button;
