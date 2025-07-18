import React, { useState } from "react";
import { Search, Filter, X, Calendar, Tag, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface SearchFilter {
  id: string;
  label: string;
  value: any;
  type: 'text' | 'select' | 'date' | 'tags' | 'boolean';
  options?: { label: string; value: string }[];
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  placeholder?: string;
  filters?: SearchFilter[];
  onClearFilters?: () => void;
}

export function AdvancedSearch({ 
  onSearch, 
  placeholder = "Search environments...", 
  filters = [],
  onClearFilters 
}: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const predefinedFilters: SearchFilter[] = [
    {
      id: 'status',
      label: 'Status',
      value: '',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Syncing', value: 'syncing' },
        { label: 'Error', value: 'error' }
      ]
    },
    {
      id: 'owner',
      label: 'Owner',
      value: '',
      type: 'select',
      options: [
        { label: 'Me', value: 'me' },
        { label: 'Team', value: 'team' },
        { label: 'Shared', value: 'shared' }
      ]
    },
    {
      id: 'created',
      label: 'Created Date',
      value: null,
      type: 'date'
    },
    {
      id: 'tags',
      label: 'Tags',
      value: [],
      type: 'tags'
    },
    {
      id: 'hasDocker',
      label: 'Has Docker',
      value: false,
      type: 'boolean'
    }
  ];

  const availableFilters = [...predefinedFilters, ...filters];
  
  const handleSearch = () => {
    onSearch(searchQuery, activeFilters);
  };

  const handleFilterChange = (filterId: string, value: any) => {
    const existingFilter = activeFilters.find(f => f.id === filterId);
    if (existingFilter) {
      setActiveFilters(activeFilters.map(f => 
        f.id === filterId ? { ...f, value } : f
      ));
    } else {
      const filterTemplate = availableFilters.find(f => f.id === filterId);
      if (filterTemplate) {
        setActiveFilters([...activeFilters, { ...filterTemplate, value }]);
      }
    }
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    onClearFilters?.();
  };

  const renderFilterValue = (filter: SearchFilter) => {
    switch (filter.type) {
      case 'select':
        const option = filter.options?.find(o => o.value === filter.value);
        return option?.label || filter.value;
      case 'date':
        return filter.value ? 'Date selected' : '';
      case 'tags':
        return Array.isArray(filter.value) ? filter.value.join(', ') : '';
      case 'boolean':
        return filter.value ? 'Yes' : 'No';
      default:
        return filter.value;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 glass border-muted"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="glass border-muted"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 glass border-muted" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Search Filters</h3>
                {activeFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              {availableFilters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <Label className="text-sm font-medium">{filter.label}</Label>
                  
                  {filter.type === 'select' && (
                    <Select
                      value={activeFilters.find(f => f.id === filter.id)?.value || ''}
                      onValueChange={(value) => handleFilterChange(filter.id, value)}
                    >
                      <SelectTrigger className="h-8 glass border-muted">
                        <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent className="glass border-muted">
                        {filter.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {filter.type === 'text' && (
                    <Input
                      value={activeFilters.find(f => f.id === filter.id)?.value || ''}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      placeholder={`Enter ${filter.label.toLowerCase()}`}
                      className="h-8 glass border-muted"
                    />
                  )}
                  
                  {filter.type === 'boolean' && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={activeFilters.find(f => f.id === filter.id)?.value || false}
                        onCheckedChange={(checked) => handleFilterChange(filter.id, checked)}
                      />
                      <Label className="text-sm">Enable {filter.label.toLowerCase()}</Label>
                    </div>
                  )}
                </div>
              ))}
              
              <Button
                onClick={() => {
                  handleSearch();
                  setShowFilters(false);
                }}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="sm"
              >
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleSearch} className="bg-gradient-primary hover:opacity-90">
          Search
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="glass border-primary/20 text-sm"
            >
              {filter.label}: {renderFilterValue(filter)}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2 hover:bg-transparent"
                onClick={() => removeFilter(filter.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}