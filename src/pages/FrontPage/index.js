import React, { useState, useEffect } from 'react';

import Story from './Story';

async function fetchStory(articleId) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`, { method: 'GET', mode: 'cors' });
  const results = await response.json();
  return results;
}

// async function fetchTop10Stories() {
//   const response = await fetch('http://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', { method: 'GET', mode: 'cors' });
//   const results = await response.json();
//   const storyIds = results.filter((value, index, arr) => index < 10);
//   const promises = storyIds.map(async storyId => await fetchStory(storyId));

//   return await Promise.all(promises);
// }

// const useFetchTopStories = () => {
//   const [ stories, setStories ] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const results = await fetchTop10Stories();
//       setStories(results);
//     };

//     fetchData();
//   }, []);

//   return stories;
// };

async function fetchStories() {
  const response = await fetch('http://hacker-news.firebaseio.com/v0/topstories.json', { method: 'GET', mode: 'cors' });
  return await response.json();
}

const useFetchTopStories = limit => {
  const [ stories, setStories ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const _stories = await fetchStories();

      const storyIds = _stories.filter((value, index, arr) => index < limit);
      const promises = storyIds.map(async storyId => await fetchStory(storyId));
      const results = await Promise.all(promises);

      setStories(results);
    };

    fetchData();
  }, []);

  return stories;
};

function TopStories() {
  // const stories = useFetchTopStories();
  const stories = useFetchTopStories(10);

  return (
    <div>
      { stories.map((story, index) => <Story key={ story.id } index={ index } story={ story } /> )}
    </div>
  );
}


export default TopStories;
