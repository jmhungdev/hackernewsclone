import { useEffect, useReducer } from 'react';
import hnEndpoint, {
  STORY
} from 'Endpoints';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        stories: action.payload
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

const defaultNumStories = 100;
const useHNstories = (storyCategory, limit = defaultNumStories) => {
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
      const promises = limitedStoryIds.map(storyId => hnEndpoint(STORY, storyId));
      const results = await Promise.all(promises);

      const someErrors = results.some(result => result.error);
      if (someErrors) return dispatch({ type: 'FETCH_FAILURE' });

      return dispatch({ type: 'FETCH_SUCCESS', payload: results });
    };

    fetchData();
  }, [limit, storyCategory]);

  return { ...state };
};


export default useHNstories;
