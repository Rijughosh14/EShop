import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { productApi } from '../api/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ProductListing() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('default');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // Fetch products based on search query or all products
  const { data, isLoading, error } = useQuery(
    ['products', searchQuery],
    () => searchQuery 
      ? productApi.searchProducts(searchQuery)
      : productApi.getAllProducts(),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading products</div>;

  const products = data?.products || [];

  const processProducts = () => {
    let result = [...products];

    switch (activeFilter) {
      case 'price-0-50':
        return result.filter(p => p.price <= 50);
      case 'price-51-100':
        return result.filter(p => p.price > 50 && p.price <= 100);
      case 'price-101-200':
        return result.filter(p => p.price > 100 && p.price <= 200);
      case 'price-201-plus':
        return result.filter(p => p.price > 200);
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'name-az':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-za':
        return result.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return result;
    }
  };

  const sortedAndFilteredProducts = processProducts();

  const filterOptions = [
    { label: 'All Products', value: 'default' },
    { label: '──── Price Filters ────', value: 'divider1', isDivider: true },
    { label: 'Under $50', value: 'price-0-50' },
    { label: '$51 - $100', value: 'price-51-100' },
    { label: '$101 - $200', value: 'price-101-200' },
    { label: 'Over $200', value: 'price-201-plus' },
    { label: '──── Sort Options ────', value: 'divider2', isDivider: true },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Name: A to Z', value: 'name-az' },
    { label: 'Name: Z to A', value: 'name-za' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Filter */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {searchQuery ? 'Search Results' : 'Our Products'}
          </h1>
          {searchQuery && (
            <p className="mt-2 text-gray-600">
              Showing results for "{searchQuery}"
            </p>
          )}
        </div>
        
        {/* Filter Dropdown - Now Right Aligned */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-48 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm 
                       hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200 
                       transition-all duration-200 flex items-center justify-between"
          >
            <span className="text-gray-700 truncate">
              {filterOptions.find(opt => opt.value === activeFilter)?.label || 'Filter & Sort'}
            </span>
            <ChevronDownIcon 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                isFilterOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div className="absolute right-0 z-10 w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {filterOptions.map((option, index) => (
                option.isDivider ? (
                  <div 
                    key={option.value} 
                    className="px-4 py-2 bg-gray-50 text-sm text-gray-500 font-medium"
                  >
                    {option.label}
                  </div>
                ) : (
                  <button
                    key={option.value}
                    onClick={() => {
                      setActiveFilter(option.value);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors duration-150
                      ${activeFilter === option.value ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}
                      ${index === 0 ? 'rounded-t-lg' : ''}
                      ${index === filterOptions.length - 1 ? 'rounded-b-lg' : ''}`}
                  >
                    {option.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {sortedAndFilteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedAndFilteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {searchQuery ? (
            <>
              <p className="text-gray-500 text-xl mb-2">
                No products found matching "{searchQuery}"
              </p>
              <p className="text-gray-400">
                Try checking your spelling or using different keywords
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-xl">
              No products found matching your criteria
            </p>
          )}
        </div>
      )}
    </div>
  );
}