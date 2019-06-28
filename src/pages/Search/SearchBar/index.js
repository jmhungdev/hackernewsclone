import React, { useState } from 'react';
import { listTop, searchTitle, searchInput, searchButton } from './styles.css';


function SearchBar({ doFetch }) {
  const [query, setQuery] = useState('redux');

  return (
    <header className={listTop}>
      <h2 className={ searchTitle }>Search Hackner News</h2>
      <input
        className={searchInput}
        type="text"
        value={ query }
        onChange={ event => setQuery(event.target.value) } />
      <button className={ searchButton } type="button" onClick={ () => doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`) }>
        Search
      </button>
    </header>
  );
}


export default SearchBar;
