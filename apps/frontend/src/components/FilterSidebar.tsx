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
    <aside
      className={`p-2 sm:p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark:border dark:border-gray-700 rounded-lg shadow space-y-4 ${className}`}
    >
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-base sm:text-lg font-semibold flex items-center">
          <ListFilter className="mr-2 h-4 w-4 flex-shrink-0 text-gray-700 dark:text-gray-300" />{" "}
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-xs whitespace-nowrap flex-shrink-0 h-10 px-4 !rounded-lg !text-base sm:!text-sm"
        >
          <FilterX className="mr-1 h-4 w-4 flex-shrink-0" /> Clear
        </Button>
      </div>

      <Separator className="my-2 border-gray-300 dark:border-gray-700" />

      <Accordion type="multiple" defaultValue={defaultAccordionValues} className="w-full space-y-1">
        <AccordionItem value="item-brand" className="border-0">
          <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline text-gray-800 dark:text-gray-200">
            Brand
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-1.5 max-h-48 overflow-y-auto pr-1 bg-white dark:bg-gray-900">
            {availableOptions.brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Switch
                  id={`brand-${brand}`}
                  checked={appliedFilters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                  className="h-6 w-11 sm:h-5 sm:w-9"
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="font-normal text-xs sm:text-sm capitalize cursor-pointer text-gray-900 dark:text-gray-100"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1 border-gray-300 dark:border-gray-700" />

        <AccordionItem value="item-condition" className="border-0">
          <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline text-gray-800 dark:text-gray-200">
            Condition
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-1.5 max-h-48 overflow-y-auto pr-1 bg-white dark:bg-gray-900">
            {availableOptions.conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={appliedFilters.conditions.includes(condition)}
                  onCheckedChange={(checked) => handleConditionChange(condition, checked)}
                  className="h-4 w-4 sm:h-3.5 sm:w-3.5"
                />
                <Label
                  htmlFor={`condition-${condition}`}
                  className="font-normal text-xs sm:text-sm capitalize cursor-pointer text-gray-900 dark:text-gray-100"
                >
                  {condition.replace("-", " ")}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1 border-gray-300 dark:border-gray-700" />

        <AccordionItem value="item-price" className="border-0">
          <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline text-gray-800 dark:text-gray-200">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2 space-y-2 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 sm:gap-1.5">
              <Input
                type="number"
                placeholder="Min"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(e.target.value)}
                className="text-xs sm:text-sm h-10 sm:h-8 focus-visible:ring-1 focus-visible:ring-offset-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <span className="text-muted-foreground text-xs sm:text-sm dark:text-gray-400">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(e.target.value)}
                className="text-xs sm:text-sm h-10 sm:h-8 focus-visible:ring-1 focus-visible:ring-offset-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Button
              onClick={handlePriceApply}
              size="sm"
              className="w-full h-10 text-base sm:text-sm mt-4 bg-blue-500 text-white !rounded-lg"
            >
              Apply Price
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
