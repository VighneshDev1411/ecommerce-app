"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, X } from "lucide-react";

export function ProductFilters() {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 1000,
  ]);
  const [selectedDietary, setSelectedDietary] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = React.useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = React.useState<string[]>([]);

  const brands = ["Organic Valley", "Silk", "Alpro", "Oatly", "Chobani"];
  const flavors = [
    "Vanilla",
    "Chocolate",
    "Strawberry",
    "Original",
    "Unsweetened",
  ];

  const handleDietaryChange = (value: string) => {
    setSelectedDietary((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  const handleFlavorChange = (flavor: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor)
        ? prev.filter((item) => item !== flavor)
        : [...prev, flavor]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedDietary([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedFlavors([]);
  };

  return (
    <div className="w-full max-w-[300px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters} // Ensure Clear All resets all states
          className="text-sm text-primary hover:text-primary"
        >
          Clear all
        </Button>
      </div>

      {/* Price Range Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Price Range</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={1000}
            step={10}
            minStepsBetweenThumbs={1}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Dietary Preferences */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Dietary</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dairy"
              checked={selectedDietary.includes("dairy")}
              onCheckedChange={() => handleDietaryChange("dairy")}
            />
            <label htmlFor="dairy" className="text-sm font-medium leading-none">
              Dairy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vegan"
              checked={selectedDietary.includes("vegan")}
              onCheckedChange={() => handleDietaryChange("vegan")}
            />
            <label htmlFor="vegan" className="text-sm font-medium leading-none">
              Vegan
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Brand Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Brand</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <label
                htmlFor={brand}
                className="text-sm font-medium leading-none"
              >
                {brand}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Rating Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Rating</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          {["4+", "3-4", "2-3", "1-2"].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none"
              >
                {rating} {rating.includes("+") ? "stars" : "stars"}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Flavor Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="text-sm font-medium">Flavor</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          {flavors.map((flavor) => (
            <div key={flavor} className="flex items-center space-x-2">
              <Checkbox
                id={flavor}
                checked={selectedFlavors.includes(flavor)}
                onCheckedChange={() => handleFlavorChange(flavor)}
              />
              <label
                htmlFor={flavor}
                className="text-sm font-medium leading-none"
              >
                {flavor}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
