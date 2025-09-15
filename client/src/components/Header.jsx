import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingBagIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  UserCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useCategories } from '../api/api';
import { logout } from '../features/auth/authSlice';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryBarVisible, setCategoryBarVisible] = useState(false);
  const [isMobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const { cart } = useCart();
  const { data: categories, isLoading } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use Redux to get authentication state
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const totalItems = cart.length;

  const toggleCategories = () => {
    setCategoryBarVisible(!isCategoryBarVisible);
  };

  const toggleMobileCategories = () => {
    setMobileCategoryOpen(!isMobileCategoryOpen);
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

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setProfileMenuOpen(false);
    navigate('/login');
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkStyles = (path) => {
    const baseStyles = "px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out";
    const activeStyles = "text-neutral-900 border-b-2 border-neutral-900";
    const inactiveStyles = "text-neutral-600 hover:text-neutral-900 hover:border-b-2 hover:border-neutral-300";
    
    return `${baseStyles} ${isActivePath(path) ? activeStyles : inactiveStyles}`;
  };

  const getMobileLinkStyles = (path) => {
    const baseStyles = "block px-4 py-3 text-sm font-medium transition-all duration-200";
    const activeStyles = "text-neutral-900 bg-neutral-50";
    const inactiveStyles = "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50";
    
    return `${baseStyles} ${isActivePath(path) ? activeStyles : inactiveStyles}`;
  };

  const renderAuthSection = () => {
    if (isAuthenticated) {
      return (
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-all duration-200"
          >
            <UserCircleIcon className="h-6 w-6 text-neutral-600" />
            {user && <span className="text-sm font-medium text-neutral-700">{user.name}</span>}
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-large bg-white border border-neutral-100 py-2 animate-scale-in">
              <div className="py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Link
          to="/login"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="btn-primary text-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  const renderMobileAuthSection = () => {
    if (isAuthenticated) {
      return (
        <div className="border-t border-neutral-200 pt-4 mt-4">
          <Link
            to="/profile"
            className={`${getMobileLinkStyles('/profile')} flex items-center`}
            onClick={() => setIsMenuOpen(false)}
          >
            <UserCircleIcon className="h-5 w-5 mr-3" />
            Profile
          </Link>
          <Link
            to="/orders"
            className={`${getMobileLinkStyles('/orders')} flex items-center`}
            onClick={() => setIsMenuOpen(false)}
          >
            Orders
          </Link>
          <button
            className={`${getMobileLinkStyles('')} flex items-center w-full text-left`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="border-t border-neutral-200 pt-4 mt-4">
        <Link
          to="/login"
          className={`${getMobileLinkStyles('/login')} flex items-center`}
          onClick={() => setIsMenuOpen(false)}
        >
          <UserIcon className="h-5 w-5 mr-3" />
          Login
        </Link>
        <Link
          to="/signup"
          className={`${getMobileLinkStyles('/signup')} flex items-center`}
          onClick={() => setIsMenuOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <div className="relative">
      <header className="bg-white/95 backdrop-blur-sm border-b border-neutral-100 sticky top-0 z-50">
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-display font-bold text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
            >
              EShop
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={getLinkStyles('/')}>
                Home
              </Link>
              
              <button
                onClick={toggleCategories}
                className={`flex items-center space-x-1 ${getLinkStyles('/category')}`}
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
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products..."
                  className="input-field pr-10"
                  aria-label="Search products"
                />
                <button
                  onClick={handleSearch}
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2
                           text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200">
                <HeartIcon className="h-6 w-6" />
              </button>

              {/* Cart */}
              <Link 
                to="/checkout" 
                className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs 
                                  rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth Section */}
              {renderAuthSection()}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-neutral-100 bg-white">
              {/* Mobile Search */}
              <div className="px-4 py-4 border-b border-neutral-100">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search products..."
                    className="input-field pr-10"
                    aria-label="Search products"
                  />
                  <button
                    onClick={handleSearch}
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2
                             text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="px-4 py-4 space-y-1">
                <Link
                  to="/"
                  className={getMobileLinkStyles('/')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile Categories Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleMobileCategories}
                    className={`w-full flex items-center justify-between ${getMobileLinkStyles('/categories')}`}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon 
                      className={`h-4 w-4 transform transition-transform duration-200 ${
                        isMobileCategoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isMobileCategoryOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {isLoading ? (
                        <div className="px-4 py-2 text-neutral-500">Loading...</div>
                      ) : (
                        categories?.map((category) => (
                          <Link
                            key={category}
                            to={`/category/${category}`}
                            className={`block px-4 py-2 text-sm rounded-lg transition-colors
                                      ${isActivePath(`/category/${category}`)
                                        ? 'bg-neutral-50 text-neutral-900'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                      }`}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setMobileCategoryOpen(false);
                            }}
                          >
                            {category}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>

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
                
                {renderMobileAuthSection()}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Category Bar */}
      {isCategoryBarVisible && (
        <div className="bg-neutral-50 border-b border-neutral-100">
          <div className="container-custom py-4">
            <div className="hidden lg:block">
              {isLoading ? (
                <div className="text-neutral-500">Loading...</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories?.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category}`}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 
                                ease-in-out border border-neutral-200 hover:border-neutral-300
                                ${isActivePath(`/category/${category}`) 
                                  ? 'bg-neutral-900 text-white border-neutral-900' 
                                  : 'text-neutral-700 hover:bg-white hover:text-neutral-900'}`}
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