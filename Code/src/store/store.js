import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";

import adminProductsSlice from "./admin/products-slice/index";
import adminOrderSlice from "./admin/orders-slice/index";

import shoppingProductSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import addressSlice from "./shop/address-slice/index";
import orderSlice from "./shop/orders-slice/index";
import searchSlice from "./shop/search-slice/index";
import reviewSlice from "./shop/review-slice/index";  

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrders: adminOrderSlice,

    shoppingProducts: shoppingProductSlice,
    shopCart: shopCartSlice,
    shopAddress: addressSlice,
    shopOrder: orderSlice,
    shopSearch: searchSlice,
    shopReview: reviewSlice,
  },
});

export default store;
