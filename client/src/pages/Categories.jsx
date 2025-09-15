import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategories } from '../api/api';

export default function Categories() {
  const { data: categories, isLoading, error } = useCategories();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center text-neutral-600">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center text-red-600">Failed to load categories.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="container-custom section-padding">
        <div className="mb-10">
          <h1 className="text-3xl font-display font-bold text-neutral-900">All Categories</h1>
          <p className="text-neutral-600 mt-2">Browse products by category</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories?.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className={`card-minimal text-center p-6 capitalize font-medium hover:shadow-soft transition-all duration-200 ${
                location.pathname === `/category/${category}` ? 'bg-neutral-900 text-white' : 'text-neutral-900'
              }`}
            >
              {category.replaceAll('-', ' ')}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


