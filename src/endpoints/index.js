import fetchBestStories from './fetchBestStories';
import fetchSearch from './fetchSearch';
import fetchStory from './fetchStory';
import fetchTopStories from './fetchTopStories';

export const BEST_STORIES = Symbol('BEST_STORIES');
export const SEARCH = Symbol('SEARCH');
export const STORY = Symbol('STORY');
export const TOP_STORIES = Symbol('TOP_STORIES');


const hnAPI = {
  [BEST_STORIES]: fetchBestStories,
  [SEARCH]: fetchSearch,
  [STORY]: fetchStory,
  [TOP_STORIES]: fetchTopStories
};

export default async function hnEndpoint(name, params) {
  return await hnAPI[name](params);
}
