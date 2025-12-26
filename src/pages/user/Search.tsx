import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, MapPin, Star, Tag, Clock, X, SlidersHorizontal } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'deals', label: 'Deals' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'dishes', label: 'Dishes' },
];

const cuisineFilters = [
  'Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'Thai', 'American', 'Mediterranean'
];

const priceFilters = ['$', '$$', '$$$', '$$$$'];

const results = [
  {
    id: '1',
    type: 'restaurant',
    name: 'The Golden Fork',
    cuisine: 'Italian',
    rating: 4.8,
    reviews: 234,
    distance: '0.5 mi',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    deal: '25% Off Dinner',
    dealExpires: '2h left',
  },
  {
    id: '2',
    type: 'restaurant',
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    rating: 4.9,
    reviews: 512,
    distance: '0.8 mi',
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=300&fit=crop',
    deal: 'Free Appetizer',
    dealExpires: '5h left',
  },
  {
    id: '3',
    type: 'dish',
    name: 'Truffle Risotto',
    restaurant: 'The Golden Fork',
    rating: 4.7,
    price: '$24',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    deal: null,
  },
  {
    id: '4',
    type: 'restaurant',
    name: 'Bella Italia',
    cuisine: 'Italian',
    rating: 4.6,
    reviews: 178,
    distance: '1.2 mi',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    deal: null,
  },
  {
    id: '5',
    type: 'restaurant',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.5,
    reviews: 156,
    distance: '0.3 mi',
    price: '$',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    deal: '20% Off Tacos',
    dealExpires: '3h left',
  },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const togglePrice = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedPrices([]);
  };

  const hasFilters = selectedCuisines.length > 0 || selectedPrices.length > 0;

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative mb-4">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search restaurants, dishes, or deals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 h-14 rounded-2xl text-base bg-card border-border shadow-sm"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors",
                showFilters ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeCategory === cat.id
                    ? "gradient-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-2xl border border-border p-4 mb-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Filters</h3>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Cuisine</p>
                <div className="flex flex-wrap gap-2">
                  {cuisineFilters.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => toggleCuisine(cuisine)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all",
                        selectedCuisines.includes(cuisine)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Price Range</p>
                <div className="flex gap-2">
                  {priceFilters.map((price) => (
                    <button
                      key={price}
                      onClick={() => togglePrice(price)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                        selectedPrices.includes(price)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {cuisine}
                <button onClick={() => toggleCuisine(cuisine)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedPrices.map((price) => (
              <span
                key={price}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
              >
                {price}
                <button onClick={() => togglePrice(price)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-40 object-cover"
                />
                {result.deal && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
                    <Tag className="w-3.5 h-3.5" />
                    {result.deal}
                  </div>
                )}
                {result.type === 'restaurant' && (
                  <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
                    {result.price}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg">{result.name}</h3>
                
                {result.type === 'restaurant' ? (
                  <>
                    <p className="text-sm text-muted-foreground">{result.cuisine}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="flex items-center gap-1 text-secondary">
                        <Star className="w-4 h-4 fill-current" />
                        {result.rating} ({result.reviews})
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {result.distance}
                      </span>
                    </div>
                    {result.dealExpires && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-primary">
                        <Clock className="w-4 h-4" />
                        {result.dealExpires}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">at {result.restaurant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-center gap-1 text-sm text-secondary">
                        <Star className="w-4 h-4 fill-current" />
                        {result.rating}
                      </span>
                      <span className="font-semibold text-foreground">{result.price}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
