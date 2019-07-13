import React, { useEffect, useState } from 'react';

import { MainGridLayout, HeaderGrid, ContentGrid, NavGrid} from 'Layouts';
import ReactWeekend from 'Components/ReactWeekend';
import Story from 'Components/Story';
import Navigation from 'Components/Navigation';
import HX from 'Elements/HX';

import { header } from './styles.css';


async function fetchStory(articleId) {
  try {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`, { method: 'GET', mode: 'cors' });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function fetchStories() {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { method: 'GET', mode: 'cors' });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function fetchTopStories(limit) {
  const _stories = await fetchStories();

  if (_stories.error) {
    return { isLoading: false, isError: true, stories: [] };
  }

  const storyIds = _stories.slice(0, limit);
  const storyPromises = storyIds.map(storyId => fetchStory(storyId));
  const stories = await Promise.all(storyPromises);

  if (stories.some(story => story.error)) {
    return { isLoading: false, isError: true, stories: [] };
  }
  return { isLoading: false, isError: false, stories };
}

const numStories = 20;
function Home({ history }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchTopStories(numStories);
      setStories(results.stories);
      setIsLoading(results.isLoading);
      setIsError(results.isError);
    };

    fetchData();
  }, []);

  return (
    <MainGridLayout>
      <HeaderGrid>
        <header className={header}>
          <ReactWeekend />
          <HX hx={'h1'}>Weekend Tech News</HX>
        </header>
      </HeaderGrid>

      <NavGrid> 
        <Navigation/>
      </NavGrid>


      <ContentGrid>
        {isError
          ? <div>Something went wrong...</div>
          : isLoading
            ? <div>...Loading...</div>
            : (
              <ul>
                {stories.map((story, index) => <Story key={story.id} index={index} story={story} history={history} />)}
              </ul>
            )
      }
      </ContentGrid>
    </MainGridLayout>
  );
}


export default Home;
