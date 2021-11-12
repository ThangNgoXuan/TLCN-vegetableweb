import Axios from 'axios';
import {
  CATEGORY_LIST_SUCCESS, CATEGORY_LIST_REQUEST, CATEGORY_LIST_FAIL,

} from "../constants/categoryConstants";

export const categoryAction = () => async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });

  try {
    const { data } = await Axios.get('/v1/category');
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_LIST_FAIL, payload: message })
  }
}