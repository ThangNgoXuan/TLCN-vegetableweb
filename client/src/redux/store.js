import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { productListReducer, topProductsReducer, topProductsRelateReducer, productDetailReducer } from './reducers/productReducer';
import { slideListReducer } from './reducers/slideReducer';

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    slideList: slideListReducer,
    topProducts: topProductsReducer,
    topProductsRelate: topProductsRelateReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

