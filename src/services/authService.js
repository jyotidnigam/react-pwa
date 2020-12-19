import { Service } from './index';

export const loginService = (data) => {
  return Service.post('/login', data);
};
