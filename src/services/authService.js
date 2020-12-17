import { Service } from './baseService';

export const loginService = (credentials) => {
  return Service.post('/api/auth/login',credentials);
};
