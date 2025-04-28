import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './features/auth/authSlice'
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer
        

    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})

setupListeners(store.dispatch)