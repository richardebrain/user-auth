import { ICart, IProduct } from '@helpers/types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { filterCartById, removeItemFromCart } from './cart.hellpers';

const initialState: ICart = {
    cartItems: [],
    hidden: true
   
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = filterCartById(state.cartItems, action.payload);

        },
        removeCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = removeItemFromCart(state.cartItems, action.payload);
        },
        deleteCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        },
        toggleCartView: (state) => {
            state.hidden = !state.hidden;
            
        },
        fetchFromServer: (state, action: PayloadAction<IProduct[]>) => {
            state.cartItems = action.payload;
            
        }


    }
})
export const {  addTocCart ,deleteCart,removeCart,toggleCartView,fetchFromServer} = cartSlice.actions;
export default cartSlice.reducer;   