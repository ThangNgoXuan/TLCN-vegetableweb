import Axios from 'axios'

import * as b from '../constants/brandConstants'

export const addBrandAction = (brand) => async (dispatch, getState) => {
  try {
    dispatch({ type: b.BRAND_CREATE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.post('/v1/brand', brand, config)

    dispatch({ type: b.BRAND_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: b.BRAND_CREATE_FAIL, payload: message })
  }
};

export const updateBrandAction = (brand) => async (dispatch, getState) => {
  try {
    dispatch({ type: b.BRAND_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.put(`/v1/brand/${brand._id}`, brand, config)

    dispatch({ type: b.BRAND_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: b.BRAND_UPDATE_FAIL, payload: message })
  }
};

export const deleteBrandAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: b.BRAND_DELETE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.delete(`/v1/brand/${id}`, config)

    dispatch({ type: b.BRAND_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: b.BRAND_DELETE_FAIL, payload: message })
  }
}