import React from 'react';
import { X, ShoppingCart, Package, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-4 bg-white rounded-lg shadow-xl overflow-hidden md:inset-8 lg:inset-16">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="md:w-1/2 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(4.0) 125 reviews</span>
              </div>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Package className="w-5 h-5 mr-2" />
                  <span>{product.stock} items in stock</span>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Product Features:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Premium quality materials</li>
                    <li>• 30-day return policy</li>
                    <li>• Free shipping on orders over $50</li>
                    <li>• 1-year manufacturer warranty</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock < 10 && product.stock > 0 && (
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                    Only {product.stock} left!
                  </span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};