import React, { useEffect, useRef, useState } from 'react';

import { Search as SearchIcon } from 'Elements/Icons';
import {
  container, barContainer, searchBar,
  searchInput, theXButton, theXBox,
  theX, searchButton
} from './styles.scss';


function SearchBar({ performSearch }) {
  const [searchTerm, setSearchTerm] = useState('reactjs');
  const [btnDisplay, setBtnDisplay] = useState({});
  const inputEl = useRef(null);

  useEffect(() => {
    performSearch(searchTerm);
  }, [performSearch, searchTerm]);

  function handleOnChange(evt) {
    const { value } = evt.target;

    if (value !== '') {
      setBtnDisplay({ display: 'flex' });
    }

    if (value === '') {
      setBtnDisplay({});
    }

    setSearchTerm(value);
  }

  function handleOnClick(evt) {
    evt.preventDefault();

    if (!searchTerm) return;

    performSearch(searchTerm);
  }

  function handleOnFocus() {
    setBtnDisplay({ display: 'flex' });
  }

  function handleOnKeyPress(evt) {
    const { value } = inputEl.current;

    if (evt.key !== 'Enter' || !value) return;

    performSearch(value);
  }

  function removeSearchTerm() {
    setSearchTerm('');
    inputEl.current.focus();
  }

  return (
    <div className={container}>
      <div className={barContainer}>
        <div className={searchBar}>
          <input className={searchInput} type="search" name="q" value={searchTerm}
            ref={inputEl}
            maxLength="2048"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            title="search"
            onKeyPress={handleOnKeyPress}
            onFocus={handleOnFocus}
            onChange={handleOnChange} />
        </div>

        <div className={theXBox}>
          <button className={theXButton} style={btnDisplay} type="button" onClick={removeSearchTerm}>
            <span className={theX}>x</span>
          </button>
        </div>
      </div>

      <button className={searchButton}
        onClick={handleOnClick}>
        <SearchIcon />
      </button>
    </div>
  );
}


export default SearchBar;
