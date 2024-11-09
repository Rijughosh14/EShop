import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useCategories } from '../api/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryBarVisible, setCategoryBarVisible] = useState(false);
  const { cart } = useCart();
  const { data: categories, isLoading } = useCategories();

  const totalItems = cart.length;

  const toggleCategories = () => {
    setCategoryBarVisible(!isCategoryBarVisible);
  };

  return (
    <div className="relative">
      {/* Main Navigation */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              EShop
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-full text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 ease-in-out"
              >
                Home
              </Link>
              
              {/* Categories Toggle Button */}
              <button
                onClick={toggleCategories}
                className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 ease-in-out"
              >
                <span>Categories</span>
                <ChevronDownIcon 
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isCategoryBarVisible ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <Link 
                to="/products" 
                className="px-4 py-2 rounded-full text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 ease-in-out"
              >
                Products
              </Link>
              
              {/* Cart Icon */}
              <Link 
                to="/checkout" 
                className="relative px-4 py-2 rounded-full text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 ease-in-out"
              >
                <div className="flex items-center">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                    rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-4">
              <Link
                to="/"
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/checkout"
                className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({totalItems})
              </Link>
              
              {/* Mobile Categories */}
              <div className="mt-4">
                <div className="px-4 font-medium text-gray-900 mb-2">Categories</div>
                {isLoading ? (
                  <div className="px-4 text-gray-500">Loading...</div>
                ) : (
                  <div className="space-y-1">
                    {categories?.map((category) => (
                      <Link
                        key={category}
                        to={`/products/category/${category}`}
                        className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Categories Bar */}
      {isCategoryBarVisible && (
        <div className="bg-gray-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            {/* Desktop Categories */}
            <div className="hidden md:block">
              {isLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {categories?.map((category) => (
                    <Link
                      key={category}
                      to={`/products/category/${category}`}
                      className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 
                               shadow-sm hover:shadow transition-all duration-200 ease-in-out border border-gray-200 
                               hover:border-primary-200"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}