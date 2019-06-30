const options = {
  method: 'GET',
  mode: 'cors'
};

async function fetchTopStories() {
  const url = `http://hacker-news.firebaseio.com/v0/topstories.json`;

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error };
  }
}


export default fetchTopStories;
