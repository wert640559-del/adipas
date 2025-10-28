// src/pages/Products.tsx
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/products/ProductCard';
import SearchBar from '../components/layout/SearchBar';
import FilterSidebar from '../components/products/FilterSidebar';
import { Button } from '../components/ui/button';
import { Loader2, AlertCircle, RefreshCw, Filter, Grid3X3, List, Package, X } from 'lucide-react';

const Products: React.FC = () => {
  const { 
    products, 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    clearFilters,
    isAnyFilterActive 
  } = useProducts();
  
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Error Loading Products</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()} size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />

      {/* Header Section */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground">
                {searchQuery 
                  ? `Found ${products.length} products matching "${searchQuery}"`
                  : `Discover ${products.length} amazing products`
                }
              </p>
              
              {/* Active Filters Display */}
              {isAnyFilterActive && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.category !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      Category: {filters.category}
                    </span>
                  )}
                  {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      Price: ${filters.minPrice} - ${filters.maxPrice}
                    </span>
                  )}
                  {filters.minRating > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      Rating: {filters.minRating}+ stars
                    </span>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-6 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 max-w-md">
                <SearchBar />
              </div>
              
              <div className="flex items-center gap-2">
                {/* Filter Button - Now Functional */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 relative"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                  {isAnyFilterActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </Button>
                
                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {products.map(product => (
              <div key={product.id} className="flex gap-4 p-6 border rounded-lg hover:shadow-md transition-shadow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 object-contain flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 capitalize">{product.category}</p>
                  <p className="text-sm text-foreground line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-yellow-500">★</span>
                      <span className="text-sm text-muted-foreground">
                        {product.rating.rate} ({product.rating.count})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto space-y-4">
              <Package className="h-16 w-16 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {searchQuery || isAnyFilterActive ? 'No products found' : 'No products available'}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || isAnyFilterActive
                    ? 'Try adjusting your search terms or filters.'
                    : 'Check back later for new products.'
                  }
                </p>
              </div>
              {(searchQuery || isAnyFilterActive) && (
                <div className="flex gap-2 justify-center">
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  )}
                  {isAnyFilterActive && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;