const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
  TOP_PRODUCTS_RELATE_REQUEST,
  TOP_PRODUCTS_RELATE_SUCCESS,
  TOP_PRODUCTS_RELATE_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = require('../constants/productConstants');


export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topProductsReducer = (state = { loading: true, topProducts: [] }, action) => {
  switch (action.type) {
    case TOP_PRODUCTS_REQUEST:
      return { loading: true }
    case TOP_PRODUCTS_SUCCESS:
      return { loading: false, topProducts: action.payload }
    case TOP_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const topProductsRelateReducer = (state = { loading: true, topProductsRelate: [] }, action) => {
  switch (action.type) {
    case TOP_PRODUCTS_RELATE_REQUEST:
      return { loading: true }
    case TOP_PRODUCTS_RELATE_SUCCESS:
      return { loading: false, topProductsRelate: action.payload.products }
    case TOP_PRODUCTS_RELATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const productDetailReducer = (state = { loading: true, product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}