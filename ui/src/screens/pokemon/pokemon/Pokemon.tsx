import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from '@reach/router'
import { Container as NesContainer } from 'nes-react'
import Search from './search/Search'
import PokemonList from './list/PokemonList'
import Filters from './filter/Filters'

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
  const [canSearch, setCanSearch] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [showSearchResults, setShowSearchResults] = React.useState(false)
  // filters
  const [canFilter, setCanFilter] = React.useState(true)
  const [typeFilters, setTypeFilters] = React.useState([])
  const [weaknessFilters, setWeaknessFilters] = React.useState([])
  const [showTypeFilters, setShowTypeFilters] = React.useState('no')
  const [showWeaknessFilters, setShowWeaknessFilters] = React.useState('no')

  return (
    <Container rounded>
      {canSearch &&
        <Search
          clickLink={clickLink}
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
