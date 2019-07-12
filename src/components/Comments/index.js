import React from 'react';

import { formatUnixTime } from 'Utils';
import {
  BackArrow as BackArrowIcon,
  Calendar as CalendarIcon,
  Profile as ProfileIcon,
  Star as StarIcon
} from 'Elements/Icons';
import HX from 'Elements/HX';
import Comment from './Comment';

import {
  commentsHeader, article, articleMeta,
  articleTitle, articleUrl, articleScore,
  articleBy, articleTime
} from './styles.scss';


function Comments({ story, comments, history }) {
  const { id, by, score, time, title, url } = story;

  function goBackToStories() {
    history.goBack();
  }

  return (
    <main>
      <header className={commentsHeader}>
        <div onClick={goBackToStories} style={{ cursor: 'pointer' }}>
          <BackArrowIcon />
        </div>
        <HX hx={'h2'}>{title}</HX>
      </header>
      <article id={id} className={article}>
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
      </article>
      <section>
        {comments.map(comment => <Comment key={comment.id} comment={comment} history={history} />)}
      </section>
    </main>
  );
}

export default Comments;
