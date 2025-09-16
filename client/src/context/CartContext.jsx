import React, { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      // if (existingItem) {
      //   return {
      //     ...state,
      //     items: state.items.map(item =>
      //       item.id === action.payload.id
      //         ? { ...item, quantity: item.quantity + action.payload.quantity }
      //         : item
      //     )
      //   };
      // }
      return {
        ...state,
        items: [...state.items, { ...action.payload }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product, quantity = 1) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      toast.error('Item is already in your cart!');
      return false;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    toast.success('Added to cart!');
    return true;
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.error('Removed from cart.');
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    toast.success('Cart updated.');
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared.');
  };

  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
