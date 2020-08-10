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
  const [canSearch, setCanSearch] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  // filters
  const [canFilter, setCanFilter] = useState(true)
  const [typeFilters, setTypeFilters] = useState([])
  const [weaknessFilters, setWeaknessFilters] = useState([])
  const [showTypeFilters, setShowTypeFilters] = useState('no')
  const [showWeaknessFilters, setShowWeaknessFilters] = useState('no')

  return (
    <Container rounded>
      {canSearch &&
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setShowSearchResults={setShowSearchResults}
          setCanFilter={setCanFilter} // hide filters when searching
        />
      }
      {canFilter &&
        <Filters
          showTypeFilters={showTypeFilters}
          showWeaknessFilters={showWeaknessFilters}
          typeFilters={typeFilters}
          weaknessFilters={weaknessFilters}
          setShowTypeFilters={setShowTypeFilters}
          setShowWeaknessFilters={setShowWeaknessFilters}
          setTypeFilters={setTypeFilters}
          setWeaknessFilters={setWeaknessFilters}
          setCanSearch={setCanSearch}
        />
      }
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
