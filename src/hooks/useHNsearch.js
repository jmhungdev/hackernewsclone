import { useState, useEffect, useReducer } from 'react';
import hnEndpoint, {
  SEARCH, STORY
} from 'Endpoints';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        searchResults: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

async function fetchSearchStories(hits) {
  const promises = hits.map(hit => hnEndpoint(STORY, hit.objectID));
  const results = await Promise.all(promises);

  return results;
}

const useHNsearch = () => {
  const [query, setQuery] = useState();
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    searchResults: []
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      dispatch({ type: 'FETCH_INIT' });

      const results = await hnEndpoint(SEARCH, query);
      if (results.error) dispatch({ type: 'FETCH_FAILURE' });
      else {
        const payload = await fetchSearchStories(results.hits);
        dispatch({ type: 'FETCH_SUCCESS', payload });
      }
    };

    fetchData();
  }, [query]);

  return {
    ...state,
    performSearch: _query => setQuery(_query)
  };
};


export default useHNsearch;
