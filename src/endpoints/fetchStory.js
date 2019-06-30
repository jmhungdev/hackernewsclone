const options = {
  method: 'GET',
  mode: 'cors'
};

async function fetchStory(articleId) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`;

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error };
  }
}


export default fetchStory;

