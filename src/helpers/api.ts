import {create} from 'apisauce';

// define the api
export const api = create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.addRequestTransform(request => {
  const token = localStorage.getItem('token');
  if(request.headers && !request.headers["Authorization"]) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});