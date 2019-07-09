import React from 'react';

import { useHNcomments } from 'Hooks';

import { MainGridLayout, HeaderGrid, ContentGrid } from 'Layouts';
import ReactWeekend from 'Components/ReactWeekend';
import Comments from 'Components/Comments';
import HX from 'Elements/HX';

import { header } from './styles.css';


function StoryComments({ location:{ state }, history }) {
  const { story } = state;
  const { comments } = useHNcomments(story.kids);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <ReactWeekend />
          <HX hx={'h1'}>Weekend Tech News</HX>
        </header>
      </HeaderGrid>

      <ContentGrid>
        {comments.length > 0
          ? <Comments story={story} comments={comments} history={history} />
          : null
        }
      </ContentGrid>
    </MainGridLayout>
  );
}


export default StoryComments;
