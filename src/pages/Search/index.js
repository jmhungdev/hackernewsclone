import React from 'react';

import { useHNsearch } from 'Hooks';
import SearchBar from './SearchBar';
import SearchList from './SearchList';


function Search() {
  const { isLoading, isError, searchResults, performSearch } = useHNsearch();

  return (
    <>
      <SearchBar performSearch={performSearch} />

      {isLoading
        ? <div>Loading ...</div>
        : isError
          ? <div>Something went wrong ...</div>
          : <SearchList data={searchResults} />

      }
    </>
  );
}


export default Search;
