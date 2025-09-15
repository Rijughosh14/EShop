import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthCart } from '../hooks/useAuthCart';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSelectors';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function ProductCard({ product }) {
  const { addToCart } = useAuthCart();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-medium transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? (
            <HeartSolidIcon className="h-5 w-5 text-accent-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-neutral-600" />
          )}
        </button>

        {/* Image Navigation */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="h-4 w-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="h-4 w-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Quick Add to Cart Button */}
        {isHovered && (
          <div className="absolute bottom-3 left-3 right-3">
            <button
              onClick={handleAddToCart}
              disabled={!isAuthenticated}
              className={`w-full py-2 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                isAuthenticated 
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95' 
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
              title={!isAuthenticated ? 'Login required to add to cart' : 'Add to cart'}
            >
              {isAuthenticated ? (
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingBagIcon className="h-4 w-4" />
                  <span>Add to Cart</span>
                </div>
              ) : (
                'Login to Add'
              )}
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-neutral-700 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-neutral-900">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-neutral-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-neutral-500">({product.rating})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
