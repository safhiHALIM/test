import React from 'react';
import { Sparkles, Tag } from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Tag className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Categories</h3>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={`group block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg'
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:shadow-md'
          }`}
        >
          <div className="flex items-center">
            <Sparkles className={`w-4 h-4 mr-2 ${selectedCategory === null ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`} />
            <span>All Products</span>
          </div>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`group block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  selectedCategory === category.id 
                    ? 'bg-white' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-blue-500 group-hover:to-purple-600'
                }`} />
                <span>{category.name}</span>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
              }`}>
                New
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
            <Sparkles className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Premium Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};