// client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { data, isLoading } = useProducts(1, 8);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-neutral-600">
                  <SparklesIcon className="h-4 w-4" />
                  <span>Everything you need in one place</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight">
                  Shop
                  <span className="text-gradient block">Everything</span>
                  For Everyday Life
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                  From fashion and groceries to electronics and furniture—discover millions of products 
                  across all categories, delivered fast and affordably.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="btn-primary inline-flex items-center justify-center group"
                >
                  <span>Explore Collection</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link 
                  to="/categories" 
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Browse Categories
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
                <div>
                  <div className="text-2xl font-bold text-neutral-900">10K+</div>
                  <div className="text-sm text-neutral-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">500+</div>
                  <div className="text-sm text-neutral-600">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">4.9</div>
                  <div className="text-sm text-neutral-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=2070&auto=format&fit=crop"
                  alt="Supermarket aisle interior with stocked shelves"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500 rounded-2xl rotate-12 opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-neutral-900 rounded-xl rotate-12 opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular and highest-rated products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="btn-secondary inline-flex items-center group"
            >
              <span>View All Products</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Free Shipping</h3>
              <p className="text-neutral-600">Free shipping on orders over $50</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Quality Guarantee</h3>
              <p className="text-neutral-600">30-day money-back guarantee</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">24/7 Support</h3>
              <p className="text-neutral-600">Round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
