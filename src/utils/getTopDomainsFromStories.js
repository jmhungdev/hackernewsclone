const numDomains = 20;

const getTopDomainsFromStories = stories => {
  const domains = stories.reduce((initDomains, story) => {
    if (!story.url) return initDomains;

    const newDomains = initDomains.slice();
    const url = new URL(story.url);
    const urlIndex = newDomains.findIndex(domainObj => domainObj.url === url.hostname);

    if (urlIndex === -1) {
      newDomains.push({ url: url.hostname, score: story.score, numPosts: 1 });
    } else {
      newDomains[urlIndex].score += story.score;
      newDomains[urlIndex].numPosts += 1;
    }

    return newDomains;
  }, []);

  domains.sort((first, second) => second.score - first.score);

  return domains.slice(0, numDomains);
};


export default getTopDomainsFromStories;
