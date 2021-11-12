import Axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT } from "../constants/userConstansts";

export const userLoginAction = (data) => async (dispatch) => {
  const { email, password, token, ggId } = data

  dispatch({ type: USER_SIGNIN_REQUEST, payload: email });
  try {
    if (token && ggId) {
      const { data } = await Axios.post('/v1/user/googleLogin', { token, ggId });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));

    } else {
      const { data } = await Axios.post('/v1/user/login', { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    }

  } catch (error) {
    console.log("sai sai")
    // console.log(error.response.data.message)
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const userLogOutAction = () => (dispatch) => {
  console.log('đang xuat')
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_SIGNOUT })
  document.location.href = "/";
}