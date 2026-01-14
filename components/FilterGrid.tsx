"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "./Button"
import { useTranslations } from 'next-intl'

interface FilterOption {
  value: string
  label: string
}

interface FilterConfig {
  key: string
  label: string
  options: FilterOption[]
  value?: string
}

interface FilterGridProps {
  filters: FilterConfig[]
  onFilterChange: (key: string, value: string) => void
  onResetFilters?: () => void
  className?: string
  showMobileButton?: boolean
  isFilterPanelOpen?: boolean
  onToggleFilterPanel?: (isOpen: boolean) => void
  selectedFilters?: Record<string, string[]>
  onSelectedFiltersChange?: (filters: Record<string, string[]>) => void
}

export function FilterGrid({ filters, onFilterChange, onResetFilters, className = "", showMobileButton = true, isFilterPanelOpen, onToggleFilterPanel, selectedFilters: externalSelectedFilters, onSelectedFiltersChange }: FilterGridProps) {
  const t = useTranslations('filterGrid')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [tempSelectedFilters, setTempSelectedFilters] = useState<Record<string, string[]>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [isFilterPanelOpenState, setIsFilterPanelOpenState] = useState(false)
  
  // Use external state if provided
  const filterPanelOpen = isFilterPanelOpen !== undefined ? isFilterPanelOpen : isFilterPanelOpenState
  const setFilterPanelOpen = onToggleFilterPanel || setIsFilterPanelOpenState
  
  // Use external selected filters if provided
  const currentSelectedFilters = externalSelectedFilters !== undefined ? externalSelectedFilters : selectedFilters
  const setCurrentSelectedFilters = onSelectedFiltersChange || setSelectedFilters

  const handleFilterClick = (key: string) => {
    if (openDropdown === key) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(key)
      // Initialize temp selection with current selection
      setTempSelectedFilters(prev => ({
        ...prev,
        [key]: currentSelectedFilters[key] || []
      }))
    }
  }

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
    // Initialize temp selection with current selection when opening mobile category
    if (!expandedCategories[categoryKey]) {
      setTempSelectedFilters(prev => ({
        ...prev,
        [categoryKey]: currentSelectedFilters[categoryKey] || []
      }))
    }
  }

  const toggleFilterPanel = () => {
    const newState = !filterPanelOpen
    setFilterPanelOpen(newState)
  }

  const handleCheckboxChange = (filterKey: string, optionValue: string, checked: boolean) => {
    setTempSelectedFilters(prev => {
      const currentSelected = prev[filterKey] || []
      let newSelected: string[]
      
      if (checked) {
        newSelected = [...currentSelected, optionValue]
      } else {
        newSelected = currentSelected.filter(value => value !== optionValue)
      }
      
      return {
        ...prev,
        [filterKey]: newSelected
      }
    })
  }

  const handleApplyFilter = (filterKey: string) => {
    const selectedValues = tempSelectedFilters[filterKey] || []
    const newSelectedFilters = {
      ...currentSelectedFilters,
      [filterKey]: selectedValues
    }
    setCurrentSelectedFilters(newSelectedFilters)
    
    // Call onFilterChange with the selected values
    if (selectedValues.length > 0) {
      onFilterChange(filterKey, selectedValues.join(','))
    } else {
      onFilterChange(filterKey, '')
    }
    
    setOpenDropdown(null)
    // Close the mobile category dropdown
    setExpandedCategories(prev => ({
      ...prev,
      [filterKey]: false
    }))
  }

  const handleRemoveFilter = (filterKey: string, valueToRemove: string) => {
    // Remove the specific value from selected filters
    const newSelectedFilters = { ...currentSelectedFilters }
    if (newSelectedFilters[filterKey]) {
      newSelectedFilters[filterKey] = newSelectedFilters[filterKey].filter(value => value !== valueToRemove)
      if (newSelectedFilters[filterKey].length === 0) {
        delete newSelectedFilters[filterKey]
      }
    }
    setCurrentSelectedFilters(newSelectedFilters)
    
    // Update temp selections to reflect the removal
    setTempSelectedFilters(prev => ({
      ...prev,
      [filterKey]: newSelectedFilters[filterKey] || []
    }))
    
    // Call onFilterChange to update parent state
    if (newSelectedFilters[filterKey] && newSelectedFilters[filterKey].length > 0) {
      onFilterChange(filterKey, newSelectedFilters[filterKey].join(','))
    } else {
      onFilterChange(filterKey, '')
    }
  }

  const handleResetFilters = () => {
    // Clear all selections
    setCurrentSelectedFilters({})
    setTempSelectedFilters({})
    
    // Call reset callback if provided
    if (onResetFilters) {
      onResetFilters()
    }
    
    // Close any open dropdowns
    setOpenDropdown(null)
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.filter-dropdown')) {
      return
    }
    setOpenDropdown(null)
  }

  const getSelectedCount = (filterKey: string) => {
    return currentSelectedFilters[filterKey]?.length || 0
  }

  return (
    <div 
      className={`w-full ${className}`}
      onClick={handleClickOutside}
    >
      {/* Desktop Active Filter Badges */}
      {Object.keys(currentSelectedFilters).length > 0 && (
        <div className="hidden md:flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 pr-4">{t('filters')}</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(currentSelectedFilters).map(([filterKey, values]) => {
              const filter = filters.find(f => f.key === filterKey)
              if (!filter) return null
              
              return values.map((value, index) => {
                const option = filter.options.find(o => o.value === value)
                if (!option) return null
                
                return (
                  <div key={`${filterKey}-${value}-${index}`} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {option.label}
                    <button
                      onClick={() => handleRemoveFilter(filterKey, value)}
                      className="text-gray-600 hover:text-gray-800 font-bold"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )
              })
            })}
          </div>
        </div>
      )}
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filters.map((filter) => (
          <div key={filter.key} className="relative filter-dropdown">
            <button
              onClick={() => handleFilterClick(filter.key)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
            >
              <span className="text-sm font-medium text-gray-700">
                {filter.label}
                {getSelectedCount(filter.key) > 0 && (
                  <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                    {getSelectedCount(filter.key)}
                  </span>
                )}
              </span>
              <ChevronDown className="w-4 h-4 text-teal-600 flex-shrink-0" />
            </button>
            
            {openDropdown === filter.key && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                <div className="py-2">
                  {filter.options.map((option) => {
                    const isChecked = tempSelectedFilters[filter.key]?.includes(option.value) || false
                    return (
                      <label
                        key={option.value}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(filter.key, option.value, e.target.checked)}
                          className="mr-3 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    )
                  })}
                  <div className="pt-2 mt-2 pb-2 pr-3 flex justify-end">
                    <Button
                      onClick={() => handleApplyFilter(filter.key)}
                      disabled={!tempSelectedFilters[filter.key] || tempSelectedFilters[filter.key].length === 0}
                      variant="primary"
                      size="sm"
                    >
                      {t('apply')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Reset Filters Button */}
      {Object.keys(currentSelectedFilters).length > 0 && onResetFilters && (
        <div className="hidden md:flex items-center justify-start mt-4">
          <Button
            onClick={handleResetFilters}
            variant="primary"
            size="sm"
          >
            {t('resetAllFilters')}
          </Button>
        </div>
      )}

      {/* Mobile Grid */}
      <div className="md:hidden">
        {/* Main Filter Toggle Button */}
        {showMobileButton && (
          <div className="mb-3">
            <button
              onClick={toggleFilterPanel}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
            >
              <span className="text-sm font-medium text-gray-700">
                {t('filters')}
              </span>
                                <ChevronDown className={`w-4 h-4 text-teal-600 transition-transform ${filterPanelOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Mobile Filter Categories */}
        {filterPanelOpen && (
          <div className="rounded-lg p-4" style={{ backgroundColor: '#e7f5f5' }}>
            {filters.map((filter, index) => (
              <div key={filter.key}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(filter.key)}
                  className="w-full flex items-center justify-between py-3 text-left hover:bg-white/50 transition-colors rounded"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {filter.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-teal-600 transition-transform ${expandedCategories[filter.key] ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Category Content */}
                {expandedCategories[filter.key] && (
                  <div className="pb-4 space-y-2">
                    {filter.options.map((option) => {
                      const isChecked = tempSelectedFilters[filter.key]?.includes(option.value) || false
                      return (
                        <label
                          key={option.value}
                          className="flex items-center px-3 py-2 hover:bg-white/50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(filter.key, option.value, e.target.checked)}
                            className="mr-3 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      )
                    })}
                    
                    {/* Individual Apply Button */}
                    <div className="pt-3 flex justify-end">
                      <Button
                        onClick={() => handleApplyFilter(filter.key)}
                        disabled={!tempSelectedFilters[filter.key] || tempSelectedFilters[filter.key].length === 0}
                        variant="primary"
                        size="sm"
                      >
                        {t('apply')}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Divider Line (except for last item) */}
                {index < filters.length - 1 && (
                  <div className="border-t border-white my-2"></div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Mobile Active Filter Badges */}
        {Object.keys(currentSelectedFilters).length > 0 && (
          <div className="border-l border-r border-b border-gray-200 rounded-b-lg p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(currentSelectedFilters).map(([filterKey, values]) => {
                const filter = filters.find(f => f.key === filterKey)
                if (!filter) return null
                
                return values.map((value, index) => {
                  const option = filter.options.find(o => o.value === value)
                  if (!option) return null
                  
                  return (
                    <div key={`${filterKey}-${value}-${index}`} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {option.label}
                      <button
                        onClick={() => handleRemoveFilter(filterKey, value)}
                        className="text-gray-600 hover:text-gray-800 font-semibold"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })
              })}
            </div>
            
            {/* Mobile Reset Filters Button */}
            {onResetFilters && (
              <div className="flex items-center justify-start">
                <Button
                  onClick={handleResetFilters}
                  variant="primary"
                  size="sm"
                >
                  {t('resetAllFilters')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>


    </div>
  )
} 