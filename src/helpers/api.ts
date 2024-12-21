import {create} from 'apisauce';

// define the api
export const usersApi = create({
  baseURL: "http://apps.local:2020/api",
});

export const feedApi = create({
  baseURL: "http://apps.local:2020/api",
});
