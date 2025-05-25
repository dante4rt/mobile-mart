import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Separator } from "./ui/separator";
import { FilterX, ListFilter } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

export interface FilterOptions {
  brands: string[];
  conditions: string[];
}

export interface AppliedFilters {
  brands: string[];
  conditions: string[];
  minPrice?: string;
  maxPrice?: string;
}

interface FilterSidebarProps {
  availableOptions: FilterOptions;
  appliedFilters: AppliedFilters;
  onFilterChange: (filters: AppliedFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function FilterSidebar({
  availableOptions,
  appliedFilters,
  onFilterChange,
  onClearFilters,
  className,
}: FilterSidebarProps) {
  const [localMinPrice, setLocalMinPrice] = useState(appliedFilters.minPrice || "");
  const [localMaxPrice, setLocalMaxPrice] = useState(appliedFilters.maxPrice || "");

  const handleBrandChange = (brand: string, checked: boolean | "indeterminate") => {
    const newBrands = checked
      ? [...appliedFilters.brands, brand]
      : appliedFilters.brands.filter((b) => b !== brand);
    onFilterChange({ ...appliedFilters, brands: newBrands });
  };

  const handleConditionChange = (condition: string, checked: boolean | "indeterminate") => {
    const newConditions = checked
      ? [...appliedFilters.conditions, condition]
      : appliedFilters.conditions.filter((c) => c !== condition);
    onFilterChange({ ...appliedFilters, conditions: newConditions });
  };

  const handlePriceApply = () => {
    onFilterChange({
      ...appliedFilters,
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
    });
  };

  const handleClearAll = () => {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    onClearFilters();
  };

  const defaultAccordionValues = ["item-brand", "item-condition", "item-price"];

  return (
    <aside className={`p-3 bg-card text-card-foreground rounded-lg shadow space-y-4 ${className}`}>
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-lg font-semibold flex items-center">
          <ListFilter className="mr-2 h-4 w-4 flex-shrink-0" /> Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-xs dark:text-white whitespace-nowrap flex-shrink-0 h-7 px-2"
        >
          <FilterX className="mr-1 h-3 w-3 flex-shrink-0" /> Clear
        </Button>
      </div>

      <Separator className="my-2" />

      <Accordion type="multiple" defaultValue={defaultAccordionValues} className="w-full space-y-1">
        <AccordionItem value="item-brand" className="border-0">
          <AccordionTrigger className="text-sm font-medium dark:text-white py-2 hover:no-underline">
            Brand
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableOptions.brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Switch
                  id={`brand-${brand}`}
                  checked={appliedFilters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="font-normal text-xs capitalize cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        <AccordionItem value="item-condition" className="border-0">
          <AccordionTrigger className="text-sm font-medium dark:text-white py-2 hover:no-underline">
            Condition
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableOptions.conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={appliedFilters.conditions.includes(condition)}
                  onCheckedChange={(checked) => handleConditionChange(condition, checked)}
                  className="h-3.5 w-3.5"
                />
                <Label
                  htmlFor={`condition-${condition}`}
                  className="font-normal text-xs capitalize cursor-pointer"
                >
                  {condition.replace("-", " ")}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        <AccordionItem value="item-price" className="border-0">
          <AccordionTrigger className="text-sm font-medium dark:text-white py-2 hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-2">
            <div className="flex items-center gap-1.5">
              <Input
                type="number"
                placeholder="Min"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(e.target.value)}
                className="text-xs h-8"
                min="0"
              />
              <span className="text-muted-foreground text-xs">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(e.target.value)}
                className="text-xs h-8"
                min="0"
              />
            </div>
            <Button
              onClick={handlePriceApply}
              size="sm"
              variant="outline"
              className="w-full text-gray-800 h-7 text-xs mt-4"
            >
              Apply Price
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
