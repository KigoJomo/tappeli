// app/cart-checkout/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/useUser';
import { Lock, MapPin, CreditCard, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '../components/Input';
import Button from '../components/Button';

const CheckoutPage = () => {
  const { cart } = useCart();
  const user = useUser();
  const [email, setEmail] = useState(user?.email || '');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 500; // Flat rate shipping
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add validation logic here
      setFormErrors({});
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </h3>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              error={formErrors.email}
            />
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                error={formErrors.firstName}
              />
              <Input
                label="Last Name"
                required
                error={formErrors.lastName}
              />
            </div>
            <Input
              label="Address"
              required
              error={formErrors.address}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                required
                error={formErrors.city}
              />
              <Input
                label="Postal Code"
                required
                error={formErrors.postalCode}
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </h3>
            <Input
              label="Card Number"
              placeholder="4242 4242 4242 4242"
              required
              startIcon={<CreditCard className="w-4 h-4" />}
              error={formErrors.cardNumber}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiration Date"
                placeholder="MM/YY"
                required
                startIcon={<Calendar className="w-4 h-4" />}
                error={formErrors.expDate}
              />
              <Input
                label="CVC"
                placeholder="123"
                required
                error={formErrors.cvc}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveAddress"
              className="accent-accent"
            />
            <label htmlFor="saveAddress" className="text-sm">
              Save shipping address for future use
            </label>
          </div>

          <Button
            type="submit"
            label="Pay Now"
            icon={<Lock className="w-4 h-4" />}
            className="w-full"
          />
        </form>

        {/* Order Summary */}
        <div className="bg-foreground/5 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-foreground/10 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image_urls[0]}
                      alt={item.product.title}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium capitalize">{item.product.title}</p>
                    <p className="text-sm text-foreground-light">
                      {item.quantity} × Ksh {item.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  Ksh {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-foreground-faded mt-6 pt-6 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Ksh {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Ksh {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Ksh {total.toLocaleString()}</span>
            </div>
          </div>

          <Link href="/products" className="mt-6 inline-block text-accent hover:underline text-sm">
            ← Return to shop
          </Link>

          <div className="mt-6 flex items-center gap-2 text-sm text-foreground-light">
            <Lock className="w-4 h-4" />
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;