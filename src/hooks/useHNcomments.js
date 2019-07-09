import { useEffect, useReducer } from 'react';
import hnEndpoint, {
  COMMENT
} from 'Endpoints';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state,
        isLoading: false,
        isError: false,
        comments: action.payload
      };
    case 'FETCH_FAILURE':
      return { ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

const useHNcomments = (commentIds=[]) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    comments: []
  });

  useEffect(() => {
    if (commentIds.length === 0) return;

    const fetchData = async () => {
      const promises = commentIds.map(async commentId => await hnEndpoint(COMMENT, commentId));
      const results = await Promise.all(promises);

      if (results.some(result => result.error)) {
        dispatch({ type: 'FETCH_FAILURE' });
        return;
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    fetchData();
  }, [commentIds]);

  return { ...state };
};


export default useHNcomments;
