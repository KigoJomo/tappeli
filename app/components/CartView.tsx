// app/components/CartView.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/useUser';
import { Frown, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import type { CartItem } from '@/utils/supabase/types';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-foreground/5 rounded-2xl group">
      <div className="relative aspect-[3/4] w-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={item.product.media.items[0].image.url}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className='w-full'>
            <p className="font-medium text-foreground capitalize">
              {item.product.name}
            </p>
            <div className="text-sm text-foreground-light my-2 space-y-1">
              {item.variant_options.map((option, index) => (
                <p key={index} className="capitalize">
                  {option.name}: {option.value}
                </p>
              ))}
            </div>
          </div>

          <button
            onClick={onRemove}
            className="text-foreground-light hover:text-foreground transition-colors ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center border rounded-full overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              className="px-3 py-1 hover:bg-foreground/5 transition-colors"
            >
              -
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="px-3 py-1 hover:bg-foreground/5 transition-colors"
            >
              +
            </button>
          </div>
          <p className="font-medium text-foreground">
            ${(item.product.price.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const CartView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const user = useUser();

  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const total = cart.reduce(
    (sum, item) => sum + item.product.price.price * item.quantity,
    0
  );

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateCartQuantity(itemId, newQuantity);
      showToast("Quantity updated", "success");
    } catch (error) {
      console.error("Error updating cart:", error);
      showToast("Error updating quantity", "error");
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      showToast("Item removed", "success");
    } catch (error) {
      console.error("Error removing item:", error);
      showToast("Error removing item", "error");
    }
  };

  if (!user) {
    return (
      <div className="w-full">
        <h4 className="text-xl">Your Cart</h4>
        <hr className="border-foreground/20 my-4" />
        <p className="text-lg text-foreground/70">
          Please log in to view your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h4 className="text-xl">Your Cart <span className="italic">({cart.length})</span></h4>
      <hr className="border-foreground/20 my-4" />

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Frown className="w-16 h-16 text-foreground/50" />
          <p className="text-lg text-foreground/70">
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
          <div className="max-h-[55vh] overflow-y-auto pr-4 space-y-4">
            {cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={(newQty) => 
                  handleUpdateQuantity(item.id, newQty)
                }
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))}
          </div>

          <div className="border-t border-foreground/20 pt-6 mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                onClick={onClose}
                href="/checkout"
                className="bg-accent text-white hover:bg-accent-dark py-3 px-6 rounded-full text-center font-medium transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/products"
                onClick={onClose}
                className="border border-foreground/20 hover:border-foreground/40 text-foreground py-3 px-6 rounded-full text-center transition-colors"
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