// src/components/products/FilterSidebar.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Star } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { filters, categories, updateFilters, clearFilters } = useProducts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 left-0 w-80 bg-background border-r shadow-lg overflow-y-auto">
        <Card className="border-0 shadow-none h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => updateFilters({ category })}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.category === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Min Price</label>
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => updateFilters({ minPrice: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border rounded text-sm"
                      min="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Max Price</label>
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) || 1000 })}
                      className="w-full px-3 py-2 border rounded text-sm"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1, 0].map(rating => (
                  <button
                    key={rating}
                    onClick={() => updateFilters({ minRating: rating })}
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.minRating === rating
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < rating
                              ? filters.minRating === rating 
                                ? 'fill-current' 
                                : 'text-yellow-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilterSidebar;