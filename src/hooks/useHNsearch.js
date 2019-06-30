import { useState, useEffect, useReducer } from 'react';
import hnEndpoint, {
  SEARCH
} from 'Endpoints';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return { ...state,
        isLoading: false,
        isError: false,
        searchResults: action.payload
      };
    case 'FETCH_FAILURE':
      return { ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

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
      if (results.error) return dispatch({ type: 'FETCH_FAILURE' });

      dispatch({ type: 'FETCH_SUCCESS', payload: results.hits });
    };

    fetchData();
  }, [query]);

  return {
    ...state,
    performSearch: _query => setQuery(_query)
  };
};


export default useHNsearch;
