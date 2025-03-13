// app/components/Products/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { Product } from '@/utils/wix/types';
import { GelatoVariant } from '@/utils/gelato/types';
import Button from '../Button';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/useUser';

interface AddToCartProps {
  product: Product;
  variants: GelatoVariant[];
  className?: string;
}

const AddToCartButton = ({ product, variants, className }: AddToCartProps) => {
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleAddToCart = async () => {
    if (!user) {
      showToast("Please log in to add items to your cart", "error");
      return;
    }

    // Validate all options are selected
    const requiredOptions = Array.from(
      new Set(variants.flatMap(v => v.variantOptions.map(o => o.name)))
    );
    
    const missingOptions = requiredOptions.filter(
      option => !selectedOptions[option]
    );

    if (missingOptions.length > 0) {
      showToast(`Please select: ${missingOptions.join(', ')}`, "error");
      return;
    }

    // Find matching variant
    const selectedVariant = variants.find(variant => 
      variant.variantOptions.every(
        option => selectedOptions[option.name] === option.value
      )
    );

    if (!selectedVariant) {
      showToast("Selected combination not available", "error");
      return;
    }

    setLoading(true);
    try {
      await addToCart(
        product,
        selectedVariant.productUid,
        selectedVariant.variantOptions
      );
      showToast("Added to cart", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Error adding item", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {variants[0]?.variantOptions.map((option) => (
        <div key={option.name} className="space-y-2">
          <h4 className="text-sm font-medium capitalize">{option.name}</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(
              new Set(variants.map(v => 
                v.variantOptions.find(o => o.name === option.name)?.value
              ).filter((value): value is string => value !== undefined))
            ).map((value) => (
              <button
                key={value}
                onClick={() => setSelectedOptions(prev => ({
                  ...prev,
                  [option.name]: value
                }))}
                className={`px-4 py-2 rounded-full border ${
                  selectedOptions[option.name] === value
                    ? 'border-accent bg-accent/10'
                    : 'border-foreground/20 hover:border-foreground/40'
                } transition-colors`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button
        label={loading ? 'Adding...' : 'Add to Cart'}
        onClick={handleAddToCart}
        disabled={loading || variants.length === 0}
        className="w-full mt-4"
      />
    </div>
  );
};

export default AddToCartButton;