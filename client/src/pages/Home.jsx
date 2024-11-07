// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../api/api'; // Assuming useProducts is defined in api.js
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  // Using useProducts hook with page and limit arguments
  const { data, isLoading } = useProducts(1, 12); // Fetching first page with 8 products (or adjust as needed)

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to EShop</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <Link 
            to="/products" 
            className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
