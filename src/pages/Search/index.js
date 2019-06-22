import React, { useState, useEffect, useReducer } from 'react';


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
  const [query, setQuery] = useState('redux');
  const { data, isLoading, isError, doFetch } = useDataAPI(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <>
      <input
        type="text"
        value={ query }
        onChange={ event => setQuery(event.target.value) } />
      <button type="button" onClick={ () => doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`) }>
        Search
      </button>

      {isError && <div>Something went wrong ...</div>}

      {isLoading
        ? (<div>Loading ...</div>)
        : (<ul>
          {data.hits.map(item => (
            <li key={ item.objectID }>
              <a href={ item.url }>{item.title}</a>
            </li>))}
        </ul>)
      }
    </>
  );
}


export default Search;
