import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthCart } from '../hooks/useAuthCart';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSelectors';

export default function ProductCard({ product }) {
  const { addToCart } = useAuthCart();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Handle next and previous image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </Link>
        {/* Navigation buttons */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-gray-700 px-2 py-1 rounded-full shadow-md"
            >
              &#10094;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-gray-700 px-2 py-1 rounded-full shadow-md"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={() => addToCart(product, 1)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isAuthenticated 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            title={!isAuthenticated ? 'Login required to add to cart' : 'Add to cart'}
          >
            {isAuthenticated ? 'Add to Cart' : 'Login to Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
