import React, { useEffect, useState } from 'react';
import { listTop, searchTitle, searchInput, searchButton } from './styles.css';


function SearchBar({ performSearch }) {
  const [searchTerm, setSearchTerm] = useState('reactjs');

  useEffect(() => {
    performSearch(searchTerm);
  }, []);

  return (
    <header className={listTop}>
      <h2 className={ searchTitle }>Search Hackner News</h2>
      <input
        className={searchInput}
        type="text"
        value={searchTerm}
        onChange={evt => setSearchTerm(evt.target.value)} />
      <button className={ searchButton } type="button" onClick={() => performSearch(searchTerm)}>
        Search
      </button>
    </header>
  );
}


export default SearchBar;
