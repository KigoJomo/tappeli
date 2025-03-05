// app/components/CartView.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/useUser';
import { Frown, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import type { Product } from '@/utils/supabase/types';

interface CartViewProps {
  onClose: () => void;
}

interface CartItemRowProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-foreground-faded rounded-2xl group">
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-20 flex-shrink-0 rounded-lg overflow-hidden bg-foreground/5">
        <Image
          src={product.image_urls[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className='w-full'>
            <p className="font-medium text-foreground capitalize">{product.title}</p>
            <p className="text-sm text-foreground-light my-2">
              Ksh {product.base_price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={onRemove}
            className="text-foreground-light hover:text-foreground transition-colors ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-foreground/5 transition-colors"
            >
              -
            </button>
            <span className="px-3 text-sm">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="px-3 py-1 hover:bg-foreground/5 transition-colors"
            >
              +
            </button>
          </div>
          <p className="font-medium text-foreground">
            Ksh {(product.base_price * quantity).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const CartView: React.FC<CartViewProps> = ({ onClose }) => {
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const user = useUser();
  const authUserId = user?.id || '';
  const { showToast } = useToast();

  const total = cart.reduce(
    (sum, item) => sum + item.product.base_price * item.quantity,
    0
  );

  const handleUpdateQuantity = async (
    product: Product,
    newQuantity: number
  ) => {
    if (authUserId) {
      try {
        showToast("Updating quantity...", "info");
        await updateCartQuantity(product, authUserId, newQuantity);
        showToast(`Quantity updated to ${newQuantity}`, "success");
      } catch (error) {
        console.error("Error updating cart:", error);
        showToast("Error updating quantity", "error");
      }
    }
  };

  const handleRemoveItem = async (product: Product) => {
    if (authUserId) {
      try {
        showToast("Removing item from cart...", "info");
        await removeFromCart(product, authUserId);
        showToast("Item removed from cart", "success");
      } catch (error) {
        console.error("Error removing item from cart:", error);
        showToast("Error removing item", "error");
      }
    }
  };

  return (
    <div className="w-full">
      <h4 className="">Your Cart <span className="italic">({cart.length})</span></h4>
      <hr className='border-foreground-faded my-2' />

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Frown className="w-16 h-16 text-foreground-light opacity-75" />
          <p className="text-lg text-foreground-light">
            Your cart feels lonely
          </p>
          <Link
            href="/products"
            onClick={onClose}
            className="text-accent hover:text-accent-dark transition-colors font-medium"
          >
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="">
          <div className="max-h-[55vh] overflow-y-scroll scrollbar-custom pr-4 space-y-4">
            {cart.map((item) => (
              <CartItemRow
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
                onUpdateQuantity={(newQuantity) =>
                  handleUpdateQuantity(item.product, newQuantity)
                }
                onRemove={() => handleRemoveItem(item.product)}
              />
            ))}
          </div>

          <div className="space-y-6 border-t border-foreground-faded pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                Ksh {total.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                onClick={onClose}
                href="/cart-checkout"
                className="bg-accent text-foreground hover:bg-accent-dark py-3 px-6 rounded-full text-center font-medium transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/products"
                onClick={onClose}
                className="border border-foreground-faded hover:border-foreground text-foreground py-3 px-6 rounded-full text-center transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
