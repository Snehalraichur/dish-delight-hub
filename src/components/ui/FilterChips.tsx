import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  category?: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  multiSelect?: boolean;
  showClearAll?: boolean;
  className?: string;
  chipClassName?: string;
}

export function FilterChips({
  options,
  selectedFilters,
  onFilterChange,
  multiSelect = true,
  showClearAll = true,
  className,
  chipClassName,
}: FilterChipsProps) {
  const handleChipClick = (value: string) => {
    if (multiSelect) {
      if (selectedFilters.includes(value)) {
        onFilterChange(selectedFilters.filter((f) => f !== value));
      } else {
        onFilterChange([...selectedFilters, value]);
      }
    } else {
      onFilterChange(selectedFilters.includes(value) ? [] : [value]);
    }
  };

  const handleClearAll = () => {
    onFilterChange([]);
  };

  // Group options by category if categories exist
  const groupedOptions = options.reduce((acc, option) => {
    const category = option.category || "default";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, FilterOption[]>);

  const hasCategories = Object.keys(groupedOptions).some((k) => k !== "default");

  return (
    <div className={cn("space-y-3", className)}>
      {hasCategories ? (
        Object.entries(groupedOptions).map(([category, categoryOptions]) => (
          <div key={category} className="space-y-2">
            {category !== "default" && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {category}
              </span>
            )}
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((option) => (
                <FilterChip
                  key={option.id}
                  option={option}
                  isSelected={selectedFilters.includes(option.value)}
                  onClick={() => handleChipClick(option.value)}
                  className={chipClassName}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <FilterChip
              key={option.id}
              option={option}
              isSelected={selectedFilters.includes(option.value)}
              onClick={() => handleChipClick(option.value)}
              className={chipClassName}
            />
          ))}
        </div>
      )}

      {showClearAll && selectedFilters.length > 0 && (
        <button
          onClick={handleClearAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Clear all filters
        </button>
      )}
    </div>
  );
}

interface FilterChipProps {
  option: FilterOption;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

function FilterChip({ option, isSelected, onClick, className }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        "border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isSelected
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted",
        className
      )}
    >
      {option.label}
      {isSelected && (
        <X className="inline-block ml-2 h-3 w-3" />
      )}
    </button>
  );
}

// Pre-configured filter sets for common use cases
export const cuisineFilters: FilterOption[] = [
  { id: "italian", label: "Italian", value: "italian", category: "Cuisine" },
  { id: "mexican", label: "Mexican", value: "mexican", category: "Cuisine" },
  { id: "asian", label: "Asian", value: "asian", category: "Cuisine" },
  { id: "american", label: "American", value: "american", category: "Cuisine" },
  { id: "indian", label: "Indian", value: "indian", category: "Cuisine" },
  { id: "mediterranean", label: "Mediterranean", value: "mediterranean", category: "Cuisine" },
];

export const priceFilters: FilterOption[] = [
  { id: "price-1", label: "$", value: "1", category: "Price" },
  { id: "price-2", label: "$$", value: "2", category: "Price" },
  { id: "price-3", label: "$$$", value: "3", category: "Price" },
  { id: "price-4", label: "$$$$", value: "4", category: "Price" },
];

export const ratingFilters: FilterOption[] = [
  { id: "rating-4", label: "4+ Stars", value: "4", category: "Rating" },
  { id: "rating-4.5", label: "4.5+ Stars", value: "4.5", category: "Rating" },
];

export const distanceFilters: FilterOption[] = [
  { id: "dist-1", label: "< 1 mile", value: "1", category: "Distance" },
  { id: "dist-3", label: "< 3 miles", value: "3", category: "Distance" },
  { id: "dist-5", label: "< 5 miles", value: "5", category: "Distance" },
  { id: "dist-10", label: "< 10 miles", value: "10", category: "Distance" },
];
