import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCart } from '../context/CartContext';
import { selectIsAuthenticated } from '../features/auth/authSelectors';
import { toast } from 'react-hot-toast';

export const useAuthCart = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { addToCart, removeFromCart, updateQuantity, clearCart, cart, cartTotal } = useCart();

  const handleAddToCart = (product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login', { 
        state: { 
          from: { pathname: window.location.pathname },
          message: 'Please login to add items to your cart'
        } 
      });
      return;
    }
    
    addToCart(product, quantity);
  };

  const handleRemoveFromCart = (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage your cart');
      navigate('/login');
      return;
    }
    
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage your cart');
      navigate('/login');
      return;
    }
    
    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage your cart');
      navigate('/login');
      return;
    }
    
    clearCart();
  };

  const handleBuyNow = (product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with purchase');
      navigate('/login', { 
        state: { 
          from: { pathname: '/checkout' },
          message: 'Please login to proceed with your purchase'
        } 
      });
      return;
    }
    
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return {
    // Cart data
    cart,
    cartTotal,
    
    // Auth-protected cart operations
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    buyNow: handleBuyNow,
    
    // Auth status
    isAuthenticated
  };
};
