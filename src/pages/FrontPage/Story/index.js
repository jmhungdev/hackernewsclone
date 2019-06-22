import React from 'react';


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
        <h1>Title: {story.title}</h1>
        <span>{ story.id }</span>
      </header>
      <section>
        <header>
          <h2>URL: {story.url}</h2>
        </header>
        {/* <!-- cheesy content --> */}
      </section>
      <section>
        <header>
          <h3>Score: {story.score}</h3>
          <h3>Time: {formatUnixTime(story.time)}</h3>
        </header>
        {/* <!-- more cheesy content --> */}
      </section>
    </article>
  );
}


export default Story;
