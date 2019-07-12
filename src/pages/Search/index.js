import React from 'react';

import { useHNsearch } from 'Hooks';

import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import ReactWeekend from 'Components/ReactWeekend';
import SearchBar from 'Components/SearchBar';
import Story from 'Components/Story';

import { header, logo } from './styles.css';


function Search({ history }) {
  const { searchResults, performSearch } = useHNsearch();

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <div className={logo}>
            <ReactWeekend />
          </div>
          <SearchBar performSearch={performSearch} />
        </header>
      </HeaderGrid>

      <ContentGrid>
        <ul>
          {searchResults.map((story, index) => (
            <Story key={story.id} index={index} story={story} history={history} />
          ))}
        </ul>
      </ContentGrid>
    </MainGridLayout>

  );
}


export default Search;
