import { configureStore } from '@reduxjs/toolkit'

import productModalReducer from './productModalSlice'

import cartItemsReducer from './cartItemsSlide'

export const store = configureStore({
    reducer: {
        productModal: productModalReducer,
        cartItems: cartItemsReducer
    },
})