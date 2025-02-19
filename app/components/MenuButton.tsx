// components/MenuButton.tsx
'use client';

import { ReactNode } from 'react';

type MenuButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  // label: string;
  // count: number;
};

const MenuButton = ({ onClick, icon }: MenuButtonProps) => {
  return (
    <button onClick={onClick} className="relative *:fill-transparent hover:*:fill-foreground *:transition-all duration-300">
      {icon}
      {/* <span className="hidden md:flex uppercase text-sm border-b-2 border-transparent md:hover:border-foreground transition-all duration-500">
        {label}
      </span> */}
    </button>
  );
};

export default MenuButton;