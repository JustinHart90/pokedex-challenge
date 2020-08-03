import React from 'react'
import { Checkbox } from 'nes-react'

interface FilterCheckboxProps {
  pokemonType: string;
  filters: string[]
  updateFilters: Function;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = (props) => {

  const isChecked = (pokeType: string, filtersArray: string[]) : boolean => {
    return (filtersArray.indexOf(pokeType) !== -1)
  }

  const handleSelect = (pokeType: string, filters: string[], updateFiltersCallback: Function) : void => {
    // if checked, remove from filters (array)
    if (isChecked(pokeType, filters)) {
      filters = filters.filter(type => type !== pokeType)
      updateFiltersCallback(filters)
    } else {
      updateFiltersCallback(filters.concat([pokeType]))
    }
  }

  return (
    <Checkbox
      key={props.pokemonType}
      label={props.pokemonType}
      checked={isChecked(props.pokemonType, props.filters)}
      onSelect={() => handleSelect(props.pokemonType, props.filters, props.updateFilters)}
    />
  )
}

export default FilterCheckbox
