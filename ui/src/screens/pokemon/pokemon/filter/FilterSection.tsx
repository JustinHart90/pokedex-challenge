import React from 'react'
import styled from 'styled-components'
import { Container as NesContainer } from 'nes-react'
import FilterCheckbox from './FilterCheckbox'

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

interface FilterSectionProps {
  label: string;
  pokemonTypes: string[];
  filters: string[];
  onUpdateFilters: Function;
}

const FilterSection: React.FC<FilterSectionProps> = (props) => {
  return (
    <Container>
      <p>{props.label}</p>
      {props.pokemonTypes.map(pokeType => (
        <FilterCheckbox 
          key={pokeType}
          pokemonType={pokeType}
          filters={props.filters}
          updateFilters={props.onUpdateFilters}
        />
      ))}
    </Container>
  )
}

export default FilterSection
