import React from 'react';

import HX from 'Elements/HX';
import {
  Calendar as CalendarIcon,
  CommentCloud as CommentCloudIcon,
  Profile as ProfileIcon,
  Star as StarIcon
} from 'Elements/Icons';
import { formatUnixTime } from 'Utils';

import {
  article, articleMeta, articleId,
  articleTitle, articleUrl, articleScore,
  articleBy, articleTime, commentCloud
} from './styles.scss';


function Story({ index, story, history }) {
  const { id, title, url, score, by, time } = story;

  function goToComments() {
    const { location } = history;
    const pathName = `/comments?${id}`;

    history.push(pathName, {
      story,
      from: location.pathname
    });
  }

  return (
    <li id={id} className={article}>
      <div style={{ width: '20px', textAlign: 'right' }}>
        <HX hx={'h2'} className={articleId}>{index + 1}</HX>
      </div>
      <div className={articleMeta}>
        <HX hx={'h1'} className={articleTitle}>{title}</HX>

        <span className={articleUrl}>{url}</span>

        <footer>
          <div className={articleScore}>
            <StarIcon />
            <span>{score} points</span>
          </div>
          <div className={articleBy}>
            <ProfileIcon />
            <span>{by}</span>
          </div>
          <div className={articleTime}>
            <CalendarIcon />
            <span>{formatUnixTime(time)}</span>
          </div>
        </footer>
      </div>
      <div className={commentCloud} onClick={goToComments}>
        <CommentCloudIcon />
      </div>
    </li>
  );
}


export default Story;
