import React from 'react';

import { id, title, url, score, footer } from './styles.scss';

function Story({ index, story }) {
  function formatUnixTime(unixTime) {
    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'long',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    };
    const time = new Date(unixTime * 1000).toLocaleTimeString('en-US', options);
    return time;
  }

  return (
    <article>
      <header>
        <span>{ index + 1 }</span>
        <h1 className={title}>{story.title}</h1>
        <span className={id}>{ story.id }</span>
      </header>
      <section>
        <header>
          <h2 className={url}>{story.url}</h2>
        </header>
        {/* <!-- cheesy content --> */}
      </section>
      <section>
        <header className={footer}>
          <h3 className={score}>Points: {story.score}</h3>
          <h3 className={score}>{formatUnixTime(story.time)}</h3>
        </header>
        {/* <!-- more cheesy content --> */}
      </section>
    </article>
  );
}


export default Story;
