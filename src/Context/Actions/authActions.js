import { loginService } from '../../services/authService';
 
export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await loginService(loginPayload)
 
    if (response.data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response.data;
    }
    dispatch({ type: 'LOGIN_ERROR', error: response.data.error });
    return {error: response.data.error};
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error.response.data.error });    
    return {error: error.response.data.error};
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}