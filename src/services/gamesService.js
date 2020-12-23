import { Service } from './index';

export const gamesByUserService = (data) => {
  return Service.post('/games', {id: data});
};

export const gameById = (data) => {
  return Service.post('/gameById', {id: data});
};

