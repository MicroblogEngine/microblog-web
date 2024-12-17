import {create} from 'apisauce';

// define the api
export const usersApi = create({
  baseURL: import.meta.env.VITE_USERS_API_BASE_URL,
});

export const feedApi = create({
  baseURL: import.meta.env.VITE_FEED_API_BASE_URL,
});
