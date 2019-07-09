import React from 'react';

import { useHNstories } from 'Hooks';
import { TOP_STORIES } from 'Endpoints';

import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import ReactWeekend from 'Components/ReactWeekend';
import Story from 'Components/Story';
import HX from 'Elements/HX';

import { header } from './styles.css';


function Home({ history }) {
  const { stories } = useHNstories(TOP_STORIES, 20);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <ReactWeekend />
          <HX hx={'h1'}>Weekend Tech News</HX>
        </header>
      </HeaderGrid>

      <ContentGrid>
        <ul>
          {stories.map((story, index) => <Story key={ story.id } index={ index } story={ story } history={history} /> )}
        </ul>
      </ContentGrid>
    </MainGridLayout>
  );
}


export default Home;
