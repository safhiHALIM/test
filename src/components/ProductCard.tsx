import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 border border-gray-100"
      onClick={() => onProductClick(product)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Out of Stock
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Package className="w-4 h-4 text-gray-600" />
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Package className="w-3 h-3 mr-1 text-gray-500" />
            <span className="text-xs font-medium text-gray-600">{product.stock} left</span>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};