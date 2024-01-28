import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";  // Update the path to your authSlice

const store = configureStore({
    reducer: {
        auth: authReducer,  // Add the auth reducer to the store
        // Add other reducers if you have them
    },
});

export default store;
