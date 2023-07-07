import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.100.65:8080/api/',
  headers: {
    post: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    put: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    delete: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

export const setAuthHeader = (jwt = '') => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
};

export default instance;