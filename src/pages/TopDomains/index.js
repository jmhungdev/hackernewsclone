import React from 'react';

import { table } from './styles.css';
import DomainHeader from './DomainHeader';
import DomainList from './DomainList';

import { getTopDomainsFromStories } from 'Utils';
import { useHNStories } from 'Hooks';
import { BEST_STORIES } from 'Endpoints';


function TopDomains() {
  const { isLoading, isError, stories } = useHNStories(BEST_STORIES, 100);
  const domains = getTopDomainsFromStories(stories);

  return isError
    ? (<div style={{ color: 'red' }}>Something went wrong...</div>)
    : (isLoading
      ? <div>...Loading...</div>
      : (
        <table className={table}>
          <tbody>
            <DomainHeader />
            <DomainList domains={domains} />
          </tbody>
        </table>
      ));
}


export default TopDomains;
