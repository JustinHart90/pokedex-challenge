import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useQuery, gql } from '@apollo/client'
import RenderList from '../list/List'

const FUZZY_SEARCH = gql`
  query($searchValue: String!) {
    fuzzySearch(searchValue: $searchValue) {
      id
      name
      num
      img
    }
  }
`

interface SearchResultsProps {
  clickLink: Function;
  searchValue: string;
}

const SearchResults: React.FC<RouteComponentProps & SearchResultsProps> = (props) => {
  const { loading, error, data } = useQuery(FUZZY_SEARCH, {
    variables: { searchValue: props.searchValue },
  });
  
  const pokemonList:
    | Array<{ id: string; name: string; img: string; num: string }>
    | undefined = data?.fuzzySearch

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

export default SearchResults
