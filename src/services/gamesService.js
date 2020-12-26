import { Service } from './index';

export const gamesByUserService = (data) => {
    return Service.post('/games', {id: data});
};

export const gameById = (data) => {
  return Service.post('/gameById', {id: data});
};

export const fetchAllGameService = () => {
  return Service.get('/games');
};

export const gameUploadService = (data) => {
  return Service.post('/create-game', data, {
    headers: {'Content-Type': 'multipart/form-data' }
  });
};


