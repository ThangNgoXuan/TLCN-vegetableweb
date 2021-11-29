import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
    productListReducer, topProductsReducer, topProductsRelateReducer, productDetailReducer,
    productCreateReducer, productDeleteReducer, productUpdateReducer
} from './reducers/productReducer';
import { slideListReducer } from './reducers/slideReducer';
import { userSigninReducer, userListReducer, userDetailsReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { categoryList, addCategoryReducer, updateCategoryReducer, deleteCategoryReducer, detailCategoryReducer } from './reducers/categoryReducers';
import { brandListReducer, brandCreateReducer, brandDeleteReducer, brandUpdateReducer, brandDetailReducer } from './reducers/brandReducer';
import { findUserOrderReducer } from './reducers/orderReducer';

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
    addProduct: productCreateReducer,
    updateProduct: productUpdateReducer,
    deleteProduct: productDeleteReducer,

    cart: cartReducer,

    userSignin: userSigninReducer,
    userList: userListReducer,
    userDetail: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,

    categoriesList: categoryList,
    addCategory: addCategoryReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    detailCategory: detailCategoryReducer,

    brandsList: brandListReducer,
    addBrand: brandCreateReducer,
    updateBrand: brandUpdateReducer,
    deleteBrand: brandDeleteReducer,
    detailBrand: brandDetailReducer,

    myOrders: findUserOrderReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

