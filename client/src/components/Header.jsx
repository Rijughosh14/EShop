import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useCategories } from '../api/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryBarVisible, setCategoryBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { data: categories, isLoading } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cart.length;

  const toggleCategories = () => {
    setCategoryBarVisible(!isCategoryBarVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkStyles = (path) => {
    const baseStyles = "px-4 py-2 rounded-full transition-all duration-200 ease-in-out";
    const activeStyles = "bg-primary-50 text-primary-600 font-medium";
    const inactiveStyles = "text-gray-700 hover:bg-primary-50 hover:text-primary-600";
    
    return `${baseStyles} ${isActivePath(path) ? activeStyles : inactiveStyles}`;
  };

  const getMobileLinkStyles = (path) => {
    const baseStyles = "block px-4 py-2 rounded-lg transition-all duration-200";
    const activeStyles = "bg-primary-50 text-primary-600 font-medium";
    const inactiveStyles = "text-gray-700 hover:bg-primary-50 hover:text-primary-600";
    
    return `${baseStyles} ${isActivePath(path) ? activeStyles : inactiveStyles}`;
  };

  return (
    <div className="relative">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
              >
                EShop
              </Link>

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

            <div className="relative mt-4 md:mt-0 md:flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           placeholder-gray-400 transition-all duration-200"
                  aria-label="Search products"
                />
                <button
                  onClick={handleSearch}
                  type="button"
                  className="absolute right-0 top-0 h-full px-4 flex items-center justify-center
                           text-gray-400 hover:text-primary-600 transition-colors"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={getLinkStyles('/')}>
                Home
              </Link>
              
              <button
                onClick={toggleCategories}
                className={`flex items-center space-x-1 ${getLinkStyles('/products/category')}`}
              >
                <span>Categories</span>
                <ChevronDownIcon 
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isCategoryBarVisible ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <Link to="/products" className={getLinkStyles('/products')}>
                Products
              </Link>
              
              <Link 
                to="/checkout" 
                className={`relative ${getLinkStyles('/checkout')}`}
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
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-4">
              <Link
                to="/"
                className={getMobileLinkStyles('/')}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={getMobileLinkStyles('/products')}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/checkout"
                className={getMobileLinkStyles('/checkout')}
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({totalItems})
              </Link>
              
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
                        className={getMobileLinkStyles(`/products/category/${category}`)}
                        onClick={() => {
                          toggleCategories();
                          setIsMenuOpen(false);
                        }}
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

      {isCategoryBarVisible && (
        <div className="bg-gray-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="hidden md:block">
              {isLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {categories?.map((category) => (
                    <Link
                      key={category}
                      to={`/products/category/${category}`}
                      className={`px-4 py-2 rounded-full bg-white shadow-sm hover:shadow transition-all duration-200 
                                ease-in-out border border-gray-200 hover:border-primary-200 
                                ${isActivePath(`/products/category/${category}`) 
                                  ? 'bg-primary-50 text-primary-600 font-medium border-primary-200' 
                                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'}`}
                      onClick={() => toggleCategories()}
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