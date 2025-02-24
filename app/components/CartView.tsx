// app/components/CartView.tsx
"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext";
import { Frown } from "lucide-react";

interface CartViewProps {
  onClose: () => void;
}

interface CartItemRowProps {
  productTitle: string;
  quantity: number;
  price: number;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ productTitle, quantity, price }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <div className="flex-1">
        <p className="font-semibold">{productTitle}</p>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      <div>
        <p className="font-semibold">Ksh {(price * quantity).toLocaleString()}</p>
      </div>
    </div>
  );
};

const CartView: React.FC<CartViewProps> = ({ onClose }) => {
  const { cart } = useCart();

  // Calculate total price from cart items.
  const total = cart.reduce((sum, item) => {
    // Ensure product.price is a number (or parse it if stored as a string)
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Your Cart</h3>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Frown className="w-12 h-12 text-gray-400" />
          <p className="mt-4 text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItemRow
              key={item.id}
              productTitle={item.product.title}
              quantity={item.quantity}
              price={Number(item.product.price)}
            />
          ))}
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-bold">${total.toLocaleString()}</p>
          </div>
          <div className="mt-6">
            <Link
              onClick={onClose}
              href="/cart-checkout"
              className="w-full block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
