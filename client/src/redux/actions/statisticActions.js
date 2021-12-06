import Axios from "axios";
//import { toast } from 'react-toastify';

import * as S from '../constants/statistic.constants'

export const statisticAllAction = () => async (dispatch) => {
  dispatch({
    type: S.ORDER_SUMMARY_TOTAL_REQUEST
  })

  try {
    const { data } = await Axios.get('/v1/statistic/all')
    dispatch({
      type: S.ORDER_SUMMARY_TOTAL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: S.ORDER_SUMMARY_TOTAL_FAIL,
      payload: error.message
    })
  }
};

export const topCustomersAction = () => async (dispatch) => {
  dispatch({
    type: S.TOP_CUSTOMER_REQUEST
  })

  try {
    const { data } = await Axios.get('/v1/statistic/topCustomer')
    dispatch({
      type: S.TOP_CUSTOMER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: S.TOP_CUSTOMER_FAIL,
      payload: error.message
    })
  }
};

export const sumarryOrders = (by) => async (dispatch) => {
  dispatch({
    type: S.ORDER_SUMMARY_REQUEST
  })

  try {
    const { data } = await Axios.get(`/v1/statistic/revenue/${by}`)
    dispatch({
      type: S.ORDER_SUMMARY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: S.ORDER_SUMMARY_FAIL,
      payload: error.message
    })
  }
};




