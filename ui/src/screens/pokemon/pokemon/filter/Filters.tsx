import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container as NesContainer } from 'nes-react'
import FilterRadio from './FilterRadio'
import FilterSection from './FilterSection'

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

const hasFilters = (filters: string[]) : boolean => {
  return (filters.length > 0)
}

const PokemonTypes = [
  'Normal', 'Fire', 'Water', 'Grass', 'Flying', 'Fighting', 'Poison', 'Electric', 'Ground', 
  'Rock','Psychic', 'Ice', 'Bug', 'Ghost', 'Steel', 'Dragon', 'Dark', 'Fairy'
]

interface FilterProps {
  typeFilters: string[];
  weaknessFilters: string[];
  setTypeFilters: Function;
  setWeaknessFilters: Function;
  setCanSearch: Function;
}

const Filters: React.FC<FilterProps> = (props) => {
  // type filters
  const [showTypeSection, setShowTypeSection] = useState(false)
  const [showTypeFilters, setShowTypeFilters] = useState('no')
  
  // weakness filters
  const [showWeaknessSection, setShowWeaknessSection] = useState(false)
  const [showWeaknessFilters, setShowWeaknessFilters] = useState('no')

  // show/hide sections
  useEffect(() : void => {
    setShowTypeSection(showTypeFilters === 'yes')
    setShowWeaknessSection(showWeaknessFilters === 'yes')
  }, [showTypeFilters, showWeaknessFilters]);


  // hide search if any filters are applied
  const { typeFilters, weaknessFilters, setCanSearch } = props;

  useEffect(() : void => {
    if (hasFilters(typeFilters) || hasFilters(weaknessFilters)) {
      setCanSearch(false);
    } else {
      setCanSearch(true);
    }
  }, [typeFilters, weaknessFilters, setCanSearch]);


  return (
    <Container>
      <p>Show Type Filters?</p>
      {hasFilters(typeFilters) &&
        <small>[{typeFilters.join(', ')}]</small>
      }
      
      <FilterRadio
        selectedValue={showTypeFilters}
        onValueChange={(selectedValue) => setShowTypeFilters(selectedValue)}
      />
      
      {showTypeSection &&
        <FilterSection
          label='Type Filters'
          pokemonTypes={PokemonTypes}
          filters={typeFilters}
          onUpdateFilters={props.setTypeFilters}
        />
      }

      <p>Show Weakness Filters?</p>
      {hasFilters(weaknessFilters) &&
        <small>[{weaknessFilters.join(', ')}]</small>
      }

      <FilterRadio
        selectedValue={showWeaknessFilters}
        onValueChange={(selectedValue) => setShowWeaknessFilters(selectedValue)}
      />

      {showWeaknessSection &&
        <FilterSection
          label='Weakness Filters'
          pokemonTypes={PokemonTypes}
          filters={weaknessFilters}
          onUpdateFilters={props.setWeaknessFilters}
        />
      }
    </Container>
  )
}

export default Filters
