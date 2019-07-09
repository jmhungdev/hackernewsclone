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
  function goToComments() {
    const pathName = `/comments?${story.id}`;
    history.push(pathName, { story });
  }

  return (
    <article id={story.id} className={article}>
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
      <div className={commentCloud} onClick={goToComments}>
        <CommentCloudIcon />
      </div>
    </article>
  );
}


export default Story;
