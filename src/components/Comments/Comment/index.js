import React from 'react';

import Button from 'Elements/Button';
import { formatUnixTime } from 'Utils';

import {
  container, header, author, pubTime,
  commentStyle, button
} from './styles.scss';


function Comment({ comment }) {
  const { id, by, kids=[], text, time } = comment;

  return (
    <section className={container}>
      <header className={header}>
        <span className={author}>{by}</span>
        <span className={pubTime}>{formatUnixTime(time)}</span>
      </header>

      <div className={commentStyle} dangerouslySetInnerHTML={{ __html: text }} />

      {kids.length > 0
        ? (<Button className={button}>{kids.length} replies</Button>)
        : null
      }
    </section>
  );
}


export default Comment;
