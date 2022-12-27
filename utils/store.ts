import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Redux/cart/cart.slice";
import screenSlice from "./Redux/screens/screen.slice";
import userSlice from "./Redux/user/user.slice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        screen: screenSlice,
        user:userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;