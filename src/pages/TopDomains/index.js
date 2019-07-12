import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getTopDomainsFromStories } from 'Utils';
import { MainGridLayout, HeaderGrid, NavGrid, ContentGrid } from 'Layouts';
import ReactWeekend from 'Components/ReactWeekend';
import DomainTable from 'Components/DomainTable';
import Button from 'Elements/Button';

import { header, actionButtons } from './styles.scss';


async function fetchStory(articleId) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`, { method: 'GET', mode: 'cors' });
  const results = await response.json();

  return results;
}

async function fetchStories() {
  const response = await fetch('http://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', { method: 'GET', mode: 'cors' });
  const results = await response.json();

  return results;
}

async function fetchTopDomains() {
  const _stories = await fetchStories();

  const storyIds = _stories.slice(0, 50);
  const storyPromises = storyIds.map(storyId => fetchStory(storyId));
  const stories = await Promise.all(storyPromises);

  const domains = getTopDomainsFromStories(stories);

  return domains;
}

function TopDomains() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchTopDomains();
      setDomains(results);
    };

    fetchData();
  }, []);

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
