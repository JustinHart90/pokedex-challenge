import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery, gql } from '@apollo/client'
import RenderList from './List'

const POKEMON_MANY = gql`
  query(
     $searchValue: String, $typeFilters: [String], $weaknessFilters: [String], $skip: Int, $limit: Int
  ) {
    pokemonMany(
      searchValue: $searchValue, typeFilters: $typeFilters, weaknessFilters: $weaknessFilters, skip: $skip, limit: $limit
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
      searchValue: props.searchValue,
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
  
  return (
    <RenderList 
      clickLink={props.clickLink}
      pokemon={pokemonList}
    />
  )
}

export default PokemonList
