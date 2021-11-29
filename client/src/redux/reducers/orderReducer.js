import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_APPROVE_REQUEST,
  ORDER_APPROVE_SUCCESS,
  ORDER_APPROVE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAYMENT_METHOD,
  ORDER_LIST_WAIT_DELIVERY_FAIL,
  ORDER_LIST_WAIT_DELIVERY_REQUEST,
  ORDER_LIST_WAIT_DELIVERY_SUCCESS,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  GET_ORDER_BY_STATUS_REQUEST,
  GET_ORDER_BY_STATUS_SUCCESS,
  GET_ORDER_BY_STATUS_FAIL,
} from '../constants/orderConstants';

const findUserOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


function createOrderReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload
      };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};


//duyet don hang
const OrderApprove = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_APPROVE_REQUEST:
      return { loading: true };
    case ORDER_APPROVE_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;

  }
};
const OrderDetailReducer = (state = { order: { billDetail: [] } }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
//lay danh sach order dang chờ giao cho shipper
const OrderListWaitDeliveryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_WAIT_DELIVERY_REQUEST:
      return { loading: true };
    case ORDER_LIST_WAIT_DELIVERY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_WAIT_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_METHOD:
      return { availableBalance: action.payload.account };
    default:
      return state;
  }
}
const updateStatusOrderShipperReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_UPDATE_STATUS_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_STATUS_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_UPDATE_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;

  }
}

const getOrderByDeliveryStatusReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_BY_STATUS_REQUEST:
      return { loading: true };
    case GET_ORDER_BY_STATUS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_ORDER_BY_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  createOrderReducer, findUserOrderReducer,
  OrderApprove, OrderDetailReducer, OrderListWaitDeliveryReducer,
  accountReducer, updateStatusOrderShipperReducer, getOrderByDeliveryStatusReducer,
};