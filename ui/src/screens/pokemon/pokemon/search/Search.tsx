import React, { useEffect, ChangeEvent } from 'react'
import { RouteComponentProps } from '@reach/router'

interface SearchProps {
  clickLink: Function;
  searchValue: string;
  setSearchValue(searchValue: string) : void;
  setShowSearchResults(showSearchResults: boolean) : void;
}

const Search: React.FC<RouteComponentProps & SearchProps> = (props) => {
  useEffect(() : void => {
    if (props.searchValue && props.searchValue.trim() !== '') {
      props.setSearchValue(props.searchValue)
      props.setShowSearchResults(true)
    } else {
      props.setShowSearchResults(false)
    }
  }, [props.searchValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    props.setSearchValue(event.target.value)
  }

  return (
    <input
      type='text' 
      className='nes-input'
      placeholder='🕵🏻‍♂️ search here...'
      value={props.searchValue}
      onChange={handleChange}
    />
  )
}

export default Search
