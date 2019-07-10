const options = {
  method: 'GET',
  mode: 'cors'
};

async function fetchComment(commentId) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`;

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error };
  }
}


export default fetchComment;
