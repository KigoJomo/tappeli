import Link from 'next/link';
import React from 'react';

interface CartViewProps {
  onClose: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onClose }) => {
  return (
    <div className='cart-view h-full'>
      <h3>Cart View</h3>
      <p>This is your cart component.</p>
      <Link
        onClick={onClose}
        href="/cart-checkout"
        className="border-b border-foreground hover:pb-1 transition-all duration-300">
        Go to Checkout
      </Link>
    </div>
  );
};

export default CartView;
