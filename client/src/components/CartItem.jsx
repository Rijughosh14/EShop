// client/src/components/CartItem.jsx
import React from 'react';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAuthCart } from '../hooks/useAuthCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useAuthCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex p-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow ml-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">${item.price}</p>
          </div>
          
          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Remove item</span>
          </button>
        </div>

        {/* Quantity Controls and Subtotal */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 hover:bg-gray-100"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 border-x">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 hover:bg-gray-100"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-lg font-medium text-gray-900">${subtotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
