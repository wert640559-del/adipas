import React from 'react';
import { Input } from '../ui/input';
import { Search, X } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useProducts();

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search products by name, category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-10 h-11 rounded-lg bg-background border-border focus:border-primary transition-colors"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;