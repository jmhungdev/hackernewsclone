const getTopDomainsFromStories = stories => {
  const domains = stories.reduce((initDomains, story) => {
    const newDomains = initDomains.slice();
    if (!story.url) return newDomains;

    const url = new URL(story.url);
    const urlIndex = newDomains.findIndex(domainObj => domainObj.url === url.hostname);

    if (urlIndex === -1) {
      newDomains.push({ url: url.hostname, score: story.score, numPosts: 1 });
    } else {
      newDomains[urlIndex].score += story.score;
      newDomains[urlIndex].numPosts++;
    }

    return newDomains;
  }, []);

  domains.sort((first, second) => {
    return second.score - first.score;
  });
  //Only display the top 20 domains
  return domains.slice(0, 20);
};


export default getTopDomainsFromStories;
