import React from 'react';

import HX from 'Elements/HX';
import {
  Star as StarIcon,
  Profile as ProfileIcon,
  Calendar as CalendarIcon,
  CommentCloud as CommentCloudIcon
} from 'Elements/Icons';
import { formatUnixTime } from 'Utils';
import {
  article, articleMeta, articleId,
  articleTitle, articleUrl, articleScore,
  articleBy, articleTime, commentCloud
} from './styles.scss';


function Story({ index, story }) {
  return (
    <article className={article}>
      <div style={{ width: '20px', textAlign: 'right' }}>
        <HX hx={'h2'} className={articleId}>{index + 1}</HX>
      </div>
      <div className={articleMeta}>
        <HX hx={'h1'} className={articleTitle}>{story.title}</HX>

        <span className={articleUrl}>{story.url}</span>

        <footer>
          <div className={articleScore}>
            <StarIcon />
            <span>{story.score} points</span>
          </div>
          <div className={articleBy}>
            <ProfileIcon />
            <span>{story.by}</span>
          </div>
          <div className={articleTime}>
            <CalendarIcon />
            <span>{formatUnixTime(story.time)}</span>
          </div>

        </footer>
      </div>
      <div className={commentCloud}>
        <CommentCloudIcon />
      </div>
    </article>
  );
}


export default Story;
