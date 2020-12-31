import axios from 'axios';

const local = 'http://localhost:8080'; 
// const local = 'https://node-game-backend.herokuapp.com';
export const baseURL = local;
const baseService  = axios.create({ baseURL  });
export const Service = axios.create({ baseURL });

baseService.interceptors.request.use( config => {
    if( localStorage.getItem('token') ) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

baseService.interceptors.response.use( config => {
    return config;
}, error => {
    if(error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        return Promise.reject({response: {data: {error: 'please login first'}}});
    }
    return Promise.reject(error);
});

export default baseService;