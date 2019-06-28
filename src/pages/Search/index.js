import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';


const dataFetchReducer = (state, action) => {
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
        data: { hits: action.payload }
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

const useDataAPI = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });

  useEffect(() => {
    const fetchData = async () => {
      // setIsError(false);
      // setIsLoading(true);
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });
        const results = await response.json();
        // setData({ hits: results.hits });
        dispatch({ type: 'FETCH_SUCCESS', payload: results.hits });
      } catch (err) {
        // setIsError(true);
        dispatch({ type: 'FETCH_FAILURE' });
      }

      // setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = url => setUrl(url);

  return { ...state, doFetch };
};

function Search() {
  const { data, isLoading, isError, doFetch } = useDataAPI(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <>
      <SearchBar doFetch={doFetch} />

      {isLoading
        ? (<div>Loading ...</div>)
        : (isError
          ? <div>Something went wrong ...</div>
          : <SearchList data={data} />
        )
      }
    </>
  );
}


export default Search;
