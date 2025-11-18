'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PriceFilter } from '@/components/products/price-filter';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

const FILTERS: FilterGroup[] = [
  {
    title: '分類',
    options: [
      { id: 'electronics', label: '電子產品', count: 128 },
      { id: 'fashion', label: '時尚配飾', count: 256 },
      { id: 'home', label: '居家用品', count: 89 },
      { id: 'sports', label: '運動器材', count: 145 },
    ],
  },
];

export function ProductFilters() {
  const [expandedFilters, setExpandedFilters] = useState<string[]>(
    FILTERS.map((f) => f.title)
  );
  const [_isAllExpanded, setIsAllExpanded] = useState(true);

  const toggleFilter = (title: string) => {
    setExpandedFilters((prev) =>
      prev.includes(title) ? prev.filter((f) => f !== title) : [...prev, title]
    );
  };

  const expandAll = () => {
    setExpandedFilters(FILTERS.map((f) => f.title));
    setIsAllExpanded(true);
  };

  const collapseAll = () => {
    setExpandedFilters([]);
    setIsAllExpanded(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">篩選</h3>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="text-xs px-2 py-1 text-primary hover:bg-primary hover:text-white! rounded transition-smooth"
            title="展開所有"
          >
            展開
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-2 py-1 text-primary hover:bg-primary hover:text-white! rounded transition-smooth"
            title="收起所有"
          >
            收起
          </button>
        </div>
      </div>

      {FILTERS.map((filter) => (
        <div key={filter.title} className="border-b border-border pb-6">
          <button
            onClick={() => toggleFilter(filter.title)}
            className="flex items-center justify-between w-full mb-4 hover:text-primary transition-smooth"
          >
            <span className="font-medium text-foreground">{filter.title}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedFilters.includes(filter.title) ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedFilters.includes(filter.title) && (
            <div className="space-y-3">
              {filter.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <span className="text-sm text-textSecondary group-hover:text-foreground transition-smooth">
                    {option.label}
                  </span>
                  <span className="text-xs text-textSecondary ml-auto">
                    ({option.count})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <PriceFilter />

      <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg transition-smooth">
        套用篩選
      </button>
      <button className="w-full border border-border text-foreground hover:bg-muted font-semibold py-2 rounded-lg transition-smooth">
        清除篩選
      </button>
    </div>
  );
}
