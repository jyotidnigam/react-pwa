import { loginService } from '../../services/authService';
 
export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await loginService(loginPayload)
 
    if (response.data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      return response.data;
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: response.data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });    
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}