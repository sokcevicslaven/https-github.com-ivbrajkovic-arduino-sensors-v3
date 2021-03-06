/**
 * User login actions
 */

// User types
import { LOGIN_USER } from '../../types';

// UI actions
import { setLoadingAction, setErrorAction } from '../../actions';

// Fetch helper
import { fetchHelper } from '../../../helper';

// Login user and update store
const loginAction = (email, password) => async dispatch => {
  // Start spinner
  dispatch(setLoadingAction());

  try {
    // Fetch login API
    const data = await fetchHelper({
      url: '/user/login',
      method: 'POST',
      data: { email, password }
    });

    // Save token to local storage
    window.localStorage.setItem('token', data.token || '');

    // Dispatch user data
    dispatch({ type: LOGIN_USER, payload: data.user || {} });
  } catch (error) {
    dispatch(setErrorAction(error));
  }
};

export default loginAction;
