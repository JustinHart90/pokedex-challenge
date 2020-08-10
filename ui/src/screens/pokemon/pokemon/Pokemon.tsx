import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'
import { Container as NesContainer } from 'nes-react'
import Search from './search'
import PokemonList from './list'
import Filters from './filter'

const Container = styled(NesContainer)`
  && {
    background: white;
    margin: 2rem 25%;

    ::after {
      z-index: unset;
      pointer-events: none;
    }
  }
`

const Pokemon: React.FC<RouteComponentProps & { clickLink: Function }> = ({
  clickLink,
}) => {
  // search
  const [searchValue, setSearchValue] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  // filters
  const [typeFilters, setTypeFilters] = useState([])
  const [weaknessFilters, setWeaknessFilters] = useState([])

  return (
    <Container rounded>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setShowSearchResults={setShowSearchResults}
      />
      <Filters
        typeFilters={typeFilters}
        weaknessFilters={weaknessFilters}
        setTypeFilters={setTypeFilters}
        setWeaknessFilters={setWeaknessFilters}
      />
      <PokemonList
        clickLink={clickLink}
        typeFilters={typeFilters}
        weaknessFilters={weaknessFilters}
        searchValue={searchValue}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
      />
    </Container>
  )
}

export default Pokemon
