import { Service } from './index';

export const loginService = (data) => {
  return Service.post('/login', data);
};

export const registerService = (data) => {
  return Service.post('/register', data);
};

