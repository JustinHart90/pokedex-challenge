import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery, gql } from '@apollo/client'
import SearchResults from '../search/SearchResults'
import RenderList from './List'

const POKEMON_MANY = gql`
  query(
    $typeFilters: [String], $weaknessFilters: [String], $skip: Int, $limit: Int
  ) {
    pokemonMany(
      typeFilters: $typeFilters, weaknessFilters: $weaknessFilters, skip: $skip, limit: $limit
    ) {
      id
      name
      num
      img
    }
  }
`

interface PokemonListProps {
  clickLink: Function;
  typeFilters: string[];
  weaknessFilters: string[];
  searchValue: string;
  showSearchResults: boolean;
  setShowSearchResults(showSearchResults: boolean) : void;
}

const PokemonList: React.FC<RouteComponentProps & PokemonListProps> = (props) => {
  const { loading, error, data } = useQuery(POKEMON_MANY, {
    variables: {
      typeFilters: props.typeFilters,
      weaknessFilters: props.weaknessFilters
    }
  })
  const pokemonList:
    | Array<{ id: string; name: string; img: string; num: string }>
    | undefined = data?.pokemonMany

  if (loading) {
    return <p>Loading...</p>
  }
  if (error || !pokemonList) {
    return <p>Error!</p>
  }

  const renderList = () => {
    if (props.showSearchResults) {
      return (
        <SearchResults
          clickLink={props.clickLink}
          searchValue={props.searchValue}
        />
      );
    } else {
      return (
        <RenderList 
          clickLink={props.clickLink}
          pokemon={pokemonList}
        />
      )
    }
  }

  return renderList();
}

export default PokemonList
