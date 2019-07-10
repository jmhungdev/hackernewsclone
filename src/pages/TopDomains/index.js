import React from 'react';
import { Link } from 'react-router-dom';

import { useHNstories } from 'Hooks';
import { TOP_STORIES, BEST_STORIES } from 'Endpoints';

import { MainGridLayout, HeaderGrid, NavGrid, ContentGrid } from 'Layouts';
import { getTopDomainsFromStories } from 'Utils';

import ReactWeekend from 'Components/ReactWeekend';
import DomainTable from 'Components/DomainTable';
import Button from 'Elements/Button';

import { header, actionButtons } from './styles.scss';


function TopDomains() {
  const numStories = 100;
  const { stories } = useHNstories(BEST_STORIES, numStories);
  const domains = getTopDomainsFromStories(stories);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <ReactWeekend />
          <div className={actionButtons}>
            <Button onClick={() => console.log('top stories')}>Top Stories</Button>
            <Button onClick={() => console.log('best stories')}>Best Stories</Button>
          </div>
        </header>
      </HeaderGrid>

      <NavGrid>
        <Link to={`/`}>Home</Link>
        <Link to={`/top-domains`}>Top Domains</Link>
        <Link to={`/search`}>Search</Link>
      </NavGrid>

      <ContentGrid>
        <DomainTable domains={domains} />
      </ContentGrid>
    </MainGridLayout>
  );
}


export default TopDomains;
