import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { productListReducer, topProductsReducer, topProductsRelateReducer, productDetailReducer } from './reducers/productReducer';
import { slideListReducer } from './reducers/slideReducer';
import { userSigninReducer, userListReducer, userDetailsReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer';
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
    slideList: slideListReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    topProducts: topProductsReducer,
    topProductsRelate: topProductsRelateReducer,
    cart: cartReducer,
    categoriesList: categoryList,
    userSignin: userSigninReducer,
    userList: userListReducer,
    userDetail: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

