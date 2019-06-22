import React, { useState, useEffect } from 'react';

import Domain from './Domain';

async function fetchStory(articleId) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`, { method: 'GET', mode: 'cors' });
  const results = await response.json();
  return results;
}

async function fetchStories() {
  const response = await fetch('http://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', { method: 'GET', mode: 'cors' });
  return await response.json();
}

async function fetchTopDomains() {
  const _stories = await fetchStories();

  const storyIds = _stories.filter((value, index, arr) => index < 50);
  const storyPromises = storyIds.map(async storyId => await fetchStory(storyId));
  const stories = await Promise.all(storyPromises);

  const domains = stories.map(story => {
    if (story.url) {
      const url = new URL(story.url);
      return url.hostname;
    }
  });

  return domains;
}

const useFetchTopDomains = () => {
  const [ domains, setDomains ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchTopDomains();
      setDomains(results);
    };

    fetchData();
  }, []);

  return domains;
};

function TopDomains() {
  const domains = useFetchTopDomains();

  return (
    <ul>
      { domains.map((domain, index) => <li key={ index }>{ domain }</li> )}
    </ul>
  );
}


export default TopDomains;
