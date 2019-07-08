import React from 'react';

import { useHNStories } from 'Hooks';
import { TOP_STORIES } from 'Endpoints';

import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import ReactWeekend from 'Components/ReactWeekend';
import Story from 'Components/Story';
import HX from 'Elements/HX';

import { header } from './styles.css';


function Home() {
  const { stories } = useHNStories(TOP_STORIES, 20);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <ReactWeekend />
          <HX hx={'h1'}>Weekend Tech News</HX>
        </header>
      </HeaderGrid>

      <ContentGrid>
        {stories.map((story, index) => <Story key={ story.id } index={ index } story={ story } /> )}
      </ContentGrid>
    </MainGridLayout>
  );
}


export default Home;
