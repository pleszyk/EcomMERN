import { configureStore } from '@reduxjs/toolkit'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';

const initialState = {};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
    },
  initialState
});

export default store;