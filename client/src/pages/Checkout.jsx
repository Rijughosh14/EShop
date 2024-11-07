import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import { productApi } from '../api/api'; // Import productApi for the Checkout function
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    try {
      const orderData = {
        items: cart,
        total: cartTotal,
        shippingAddress: formData,
      };

      const response = await productApi.Checkout(orderData); // Use productApi.Checkout instead of createOrder
      clearCart();
      navigate('/payment-status', { 
        state: { success: true, orderId: response.orderId }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      navigate('/payment-status', { 
        state: { success: false, error: error.message }
      });
    }
    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CheckoutForm onSubmit={handleSubmit} isProcessing={isProcessing} />
        <OrderSummary cart={cart} total={cartTotal} />
      </div>
    </div>
  );
}
