import Axios from 'axios';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_TOPSELLERS_LIST_REQUEST, USER_TOPSELLERS_LIST_SUCCESS, USER_TOPSELLERS_LIST_FAIL } from "../constants/userConstansts";

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
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_SIGNOUT })
  document.location.href = "/";
}

export const listUserAction = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST });

  try {
    const { data } = await Axios.get('/v1/user');
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/v1/user/profile/${userId}`);
    // , {
    //   headers: { Authorization: `Bearer ${userInfo?.token}` },
    // });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      // headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};
export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await Axios.get('/api/users/top-sellers');
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};