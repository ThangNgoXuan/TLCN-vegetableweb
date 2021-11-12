import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { productListReducer, topProductsReducer, topProductsRelateReducer, productDetailReducer } from './reducers/productReducer';
import { slideListReducer } from './reducers/slideReducer';
import { userSigninReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { categoryList } from './reducers/categoryReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    slideList: slideListReducer,
    topProducts: topProductsReducer,
    topProductsRelate: topProductsRelateReducer,
    userSignin: userSigninReducer,
    cart: cartReducer,
    categoriesList: categoryList,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

