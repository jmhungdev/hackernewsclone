import React from 'react';

import { useHNstories } from 'Hooks';
import { TOP_STORIES, BEST_STORIES } from 'Endpoints';
import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import { getTopDomainsFromStories } from 'Utils';

import ReactWeekend from 'Components/ReactWeekend';
import DomainTable from 'Components/DomainTable';
import Button from 'Elements/Button';

import { header } from './styles.scss';


function TopDomains() {
  const { stories } = useHNstories(BEST_STORIES, 100);
  const domains = getTopDomainsFromStories(stories);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <ReactWeekend />
          <div>
            <Button onClick={() => console.log('top stories')}>Top Stories</Button>
            <Button onClick={() => console.log('best stories')}>Best Stories</Button>
          </div>
        </header>
      </HeaderGrid>

      <ContentGrid>
        <DomainTable domains={domains} />
      </ContentGrid>
    </MainGridLayout>
  );
}


export default TopDomains;
