import React, { useEffect, ChangeEvent } from 'react'

interface SearchProps {
  searchValue: string;
  setSearchValue(searchValue: string) : void;
  setShowSearchResults(showSearchResults: boolean) : void;
  setCanFilter(canFilter: boolean) : void;
}

const Search: React.FC<SearchProps> = (props) => {
  const { searchValue, setSearchValue, setShowSearchResults, setCanFilter} = props;

  useEffect(() : void => {
    if (searchValue && searchValue.trim() !== '') {
      setSearchValue(searchValue)
      setShowSearchResults(true)
      setCanFilter(false)
    } else {
      setShowSearchResults(false)
      setCanFilter(true)
    }
  }, [searchValue, setSearchValue, setShowSearchResults, setCanFilter]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    setSearchValue(event.target.value)
  }

  return (
    <input
      type='text' 
      className='nes-input'
      placeholder='🕵🏻‍♂️ search here...'
      value={searchValue}
      onChange={handleChange}
    />
  )
}

export default Search
