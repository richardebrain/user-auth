import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { cartSlice } from "./Redux/cart/cart.slice";
import { modalSlice } from "./Redux/modals/modal.slice";
import { screenSlice } from "./Redux/screens/screen.slice";
import { userSlice } from "./Redux/user/user.slice";
import { addressSlice } from "./Redux/address/address.slice";


const makeStore = () => configureStore({
    reducer: {
        [cartSlice.name]: cartSlice.reducer,
        [screenSlice.name]: screenSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [modalSlice.name]: modalSlice.reducer,
        [addressSlice.name]: addressSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<

    ReturnType,
    AppState,
    unknown,
    Action
>

export const wrapper = createWrapper<AppStore>(makeStore)