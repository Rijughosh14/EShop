import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../api/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart({ ...product }, quantity); // Pass quantity as an argument
  };

  const handleBuyNow = () => {
    addToCart({ ...product }, quantity); // Pass quantity as an argument
    navigate('/checkout');
  };

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="relative aspect-w-1 aspect-h-1">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
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

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div className="flex items-center space-x-4">
            <label className="text-gray-600">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input-field w-24"
            >
              {[...Array(10)].map((_, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn-secondary flex-1">
              Buy Now
            </button>
          </div>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="space-y-2">
              {product.rating && (
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">Rating:</span>
                  <span>{product.rating.toFixed(2)}</span>
                </li>
              )}
              {product.returnPolicy && (
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">Return Policy:</span>
                  <span>{product.returnPolicy}</span>
                </li>
              )}
              {product.shippingInformation && (
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">Shipping Information:</span>
                  <span>{product.shippingInformation}</span>
                </li>
              )}
              {product.stock && (
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">Stock:</span>
                  <span>{product.stock}</span>
                </li>
              )}
              {product.warrantyInformation && (
                <li className="flex items-start space-x-2">
                  <span className="font-semibold">Warranty:</span>
                  <span>{product.warrantyInformation}</span>
                </li>
              )}

              {/* Display Reviews */}
              {product.reviews && product.reviews.length > 0 && (
                <li className="mt-4">
                  <h3 className="font-semibold">Customer Reviews:</h3>
                  <div className="border rounded p-2 mt-2">
                    <p className="text-gray-800">{product.reviews[0].comment}</p>
                    <p className="text-gray-600 text-sm">- {product.reviews[0].reviewerName}</p>
                  </div>
                  {product.reviews.length > 1 && (
                    <p className="text-gray-600 text-sm mt-2">
                      and {product.reviews.length - 1} more review(s)
                    </p>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
