const options = {
  method: 'GET',
  mode: 'cors'
};

async function fetchSearch(query) {
  const url = `https://hn.algolia.com/api/v1/search?query=${query}`;

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    return { error };
  }
}


export default fetchSearch;
