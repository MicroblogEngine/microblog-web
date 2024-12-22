import {create} from 'apisauce';

// define the api
export const api = create({
  baseURL: import.meta.env.VITE_BASE_URL,
});