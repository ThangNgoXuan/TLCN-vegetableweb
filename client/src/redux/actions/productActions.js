import Axios from 'axios';
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  TOP_PRODUCTS_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_RELATE_REQUEST,
  TOP_PRODUCTS_RELATE_SUCCESS,
  TOP_PRODUCTS_RELATE_FAIL,
} from '../constants/productConstants';

export const listProducts = ({
  pageNumber = '',
  name = '',
  category = '',
  certification = '',
  min = '',
  max = '',
}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/v1/products?pageNumber=${pageNumber}&name=${name}&category=${category}&certification=${certification}&min=${min}&max=${max}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/v1/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const topProductAction = () => async (dispatch) => {

  dispatch({ type: TOP_PRODUCTS_REQUEST });

  try {
    const { data } = await Axios.get('v1/products/top-product');
    dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: TOP_PRODUCTS_FAIL, payload: error.message })
  }
}

export const topProductsRelate = (productId) => async (dispatch) => {

  dispatch({ type: TOP_PRODUCTS_RELATE_REQUEST });

  try {
    const { data } = await Axios.get(`/v1/products/product-related/${productId}`);
    dispatch({ type: TOP_PRODUCTS_RELATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: TOP_PRODUCTS_RELATE_FAIL, payload: error.message })
  }
}
