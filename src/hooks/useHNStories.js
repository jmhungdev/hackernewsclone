import { useEffect, useReducer } from 'react';
import hnEndpoint, {
  STORY
} from 'Endpoints';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state,
        isLoading: false,
        isError: false,
        stories: action.payload
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

const useHNStories = (storyCategory, limit=100) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    stories: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const storyIds = await hnEndpoint(storyCategory);
      if (storyIds.error) return dispatch({ type: 'FETCH_FAILURE' });

      const limitedStoryIds = storyIds.slice(0, limit);
      const promises = limitedStoryIds.map(async storyId => await hnEndpoint(STORY, storyId));
      const results = await Promise.all(promises);

      if (results.some(result => result.error)) {
        dispatch({ type: 'FETCH_FAILURE' });
        return;
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    fetchData();
  }, [limit]);

  return { ...state };
};


export default useHNStories;
