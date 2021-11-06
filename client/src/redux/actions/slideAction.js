import Axios from "axios";
import { SLIDE_LIST_FAIL, SLIDE_LIST_REQUEST, SLIDE_LIST_SUCCESS } from "../constants/slideConstants";

export const listSlides = () => async (dispatch) => {
  dispatch({
    type: SLIDE_LIST_REQUEST
  })

  try {
    const { data } = await Axios.get('/v1/slide')
    dispatch({
      type: SLIDE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SLIDE_LIST_FAIL,
      payload: error.message
    })
  }
}
