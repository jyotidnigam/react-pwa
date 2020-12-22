import { Service } from './index';


export const gameUploadService = (data) => {
  return Service.post('/create-game', data, {
    headers: {'Content-Type': 'multipart/form-data' }
  });
};

