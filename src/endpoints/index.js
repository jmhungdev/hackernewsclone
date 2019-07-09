import fetchBestStories from './fetchBestStories';
import fetchComment from './fetchComment';
import fetchSearch from './fetchSearch';
import fetchStory from './fetchStory';
import fetchTopStories from './fetchTopStories';

export const BEST_STORIES = Symbol('BEST_STORIES');
export const COMMENT = Symbol('COMMENT');
export const SEARCH = Symbol('SEARCH');
export const STORY = Symbol('STORY');
export const TOP_STORIES = Symbol('TOP_STORIES');


const hnAPI = {
  [BEST_STORIES]: fetchBestStories,
  [COMMENT]: fetchComment,
  [SEARCH]: fetchSearch,
  [STORY]: fetchStory,
  [TOP_STORIES]: fetchTopStories
};


export default async function hnEndpoint(name, params) {
  return await hnAPI[name](params);
}
