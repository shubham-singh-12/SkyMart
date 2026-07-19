import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

// ============================================ central redux store, auth + cart live here as separate slices =============================================
export const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer },
});
