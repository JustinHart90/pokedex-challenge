import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container as NesContainer, Radios, Checkbox } from 'nes-react'

const Container = styled(NesContainer)`
  && {
    background: white;
    margin: 0;

    ::after {
      z-index: unset;
      pointer-events: none;
    }
  }
`

const PokemonTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Flying', 'Fighting', 'Poison', 'Electric', 'Ground', 
  'Rock','Psychic', 'Ice', 'Bug', 'Ghost', 'Steel', 'Dragon', 'Dark', 'Fairy'
]

interface FilterProps {
  showTypeFilters: string;
  showWeaknessFilters: string;
  typeFilters: string[];
  weaknessFilters: string[];
  setShowTypeFilters: Function;
  setShowWeaknessFilters: Function;
  setTypeFilters: Function;
  setWeaknessFilters: Function;
}

const Filters: React.FC<FilterProps> = (props) => {
  const [showTypeFilterBool, setShowTypeFilterBool] = React.useState(false)
  const [showWeaknessFilterBool, setShowWeaknessFilterBool] = React.useState(false)
  
  // show/hide type filters
  useEffect(() : void => {
    const showTypeFilters = Boolean(props.showTypeFilters === 'yes')
    setShowTypeFilterBool(showTypeFilters)
  }, [props.showTypeFilters]);
  
  // show/hide weakness filters
  useEffect(() : void => {
    const showWeaknessFilters = Boolean(props.showWeaknessFilters === 'yes')
    setShowWeaknessFilterBool(showWeaknessFilters)
  }, [props.showWeaknessFilters]);


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
    <Container>
      <p>Show Type Filters?</p>
      {props.typeFilters.length > 0 &&
        <small>[{props.typeFilters.join(', ')}]</small>
      }
      <Radios
        options={[
          {value: 'yes', label: 'Yes'},
          {value: 'no', label: 'No'}
        ]}
        selectedValue={props.showTypeFilters}
        onValueChange={(selectedValue) => props.setShowTypeFilters(selectedValue)}
      />
      {showTypeFilterBool &&
        <Container>
          <p>Type Filters</p>
          {PokemonTypes.map(pokeType => (
            <Checkbox
              key={pokeType}
              label={pokeType}
              checked={isChecked(pokeType, props.typeFilters)}
              onSelect={() => handleSelect(pokeType, props.typeFilters, props.setTypeFilters)}
            />
          ))}
        </Container>
      }
      
      <p>Show Weakness Filters?</p>
      {props.weaknessFilters.length > 0 &&
        <small>[{props.weaknessFilters.join(', ')}]</small>
      }
      <Radios
        options={[
          {value: 'yes', label: 'Yes'},
          {value: 'no', label: 'No'}
        ]}
        selectedValue={props.showWeaknessFilters}
        onValueChange={(selectedValue) => props.setShowWeaknessFilters(selectedValue)}
      />
      {showWeaknessFilterBool &&
        <Container>
          <p>Weakness Filters</p>
          {PokemonTypes.map(pokeType => (
            <Checkbox
              key={pokeType}
              label={pokeType}
              checked={isChecked(pokeType, props.weaknessFilters)}
              onSelect={() => handleSelect(pokeType, props.weaknessFilters, props.setWeaknessFilters)}
            />
          ))}
        </Container>
      }
    </Container>
  )
}

export default Filters
