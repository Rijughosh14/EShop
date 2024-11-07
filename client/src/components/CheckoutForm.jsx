import React from 'react';
import { useForm } from 'react-hook-form';

export default function CheckoutForm({ onSubmit, isProcessing }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              className="input-field"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm zmt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="input-field"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Invalid phone number'
                }
              })}
              className="input-field"
              placeholder="1234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              {...register('address', { required: 'Address is required' })}
              className="input-field"
              placeholder="123 Main St"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                {...register('city', { required: 'City is required' })}
                className="input-field"
                placeholder="New York"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Postal Code</label>
              <input
                {...register('postalCode', { required: 'Postal code is required' })}
                className="input-field"
                placeholder="12345"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Card Number</label>
            <input
              {...register('cardNumber', { 
                required: 'Card number is required',
                pattern: {
                  value: /^\d{16}$/,
                  message: 'Invalid card number'
                }
              })}
              className="input-field"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Expiry Date</label>
              <input
                {...register('expiryDate', { 
                  required: 'Expiry date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: 'Invalid expiry date (MM/YY)'
                  }
                })}
                className="input-field"
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">CVV</label>
              <input
                type="password"
                {...register('cvv', { 
                  required: 'CVV is required',
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: 'Invalid CVV'
                  }
                })}
                className="input-field"
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-primary w-full"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Processing...
          </div>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}