// client/src/pages/PaymentStatus.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, orderId, error } = location.state || {};

  useEffect(() => {
    // Redirect to home if accessed directly without payment data
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto card text-center">
        {success ? (
          <>
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-500 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-600">Order ID:</p>
              <p className="font-mono font-bold">{orderId}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to your email address.
            </p>
          </>
        ) : (
          <>
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-500 mb-2">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-4">
              {error || 'There was an error processing your payment.'}
            </p>
          </>
        )}

        <div className="flex flex-col space-y-2">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return to Home
          </button>
          {!success && (
            <button
              onClick={() => navigate('/checkout')}
              className="btn-secondary"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}