import React from 'react';
import { distanceInWordsToNow } from 'date-fns';

import { story, stories, title } from './styles.css';


function SearchList({ data }) {
  return (
    <ul className={stories}>
      {data.map(item => {
        const url = item.url ? new URL(item.url) : '';
        const timeAgo = distanceInWordsToNow(item.created_at, { addSuffix: true });
        const userLink = `https://news.ycombinator.com/user?id=${item.author}`;
        const commentLink = `https://news.ycombinator.com/item?id=${item.objectID}`;

        return (
          <li key={ item.objectID } className={story}>
            <div>
              <a className={title} href={ item.url }>{ item.title } </a>
            </div>
            <div>
              <span> { item.points } points </span>
              <span> | <a href={ userLink }>{ item.author }</a> </span>
              <span> | { timeAgo } </span>
              <span> | <a href={ commentLink }>{ item.num_comments } comments</a> </span>
              {url && <span> | <a href={ 'http://' + url.hostname }>{ url.hostname }</a> </span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}


export default SearchList;
