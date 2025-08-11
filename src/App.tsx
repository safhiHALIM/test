import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { CategoryFilter } from './components/CategoryFilter';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { mockProducts, mockCategories } from './data/mockData';
import { Product, Category } from './types';

const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const { user, isAdmin, loading } = useAuth();

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleProductDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleProductAdd = (productData: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show admin panel if user is admin and requested
  if (showAdmin && isAdmin) {
    return (
      <div>
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setShowAdmin(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Store
            </button>
          </div>
        </div>
        <AdminPanel
          products={products}
          categories={categories}
          onProductUpdate={handleProductUpdate}
          onProductDelete={handleProductDelete}
          onProductAdd={handleProductAdd}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-700/50" />
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400/20 rounded-full blur-lg" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to ModernStore
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez des produits exceptionnels à des prix imbattables avec une expérience d'achat premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!user && (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Commencer vos achats
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => setShowAdmin(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Panneau Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory 
                  ? categories.find(c => c.id === selectedCategory)?.name 
                  : 'All Products'
                }
              </h2>
              <span className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <div className="text-gray-500 text-2xl font-semibold mb-4">Aucun produit trouvé</div>
                <p className="text-gray-400 text-lg">Essayez d'ajuster votre recherche ou votre filtre de catégorie</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;