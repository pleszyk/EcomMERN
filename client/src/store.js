import { configureStore } from '@reduxjs/toolkit';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer } from './reducers/userReducers';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoItemsFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoItemsFromStorage },
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
  },
  preloadedState,
});

export default store;
