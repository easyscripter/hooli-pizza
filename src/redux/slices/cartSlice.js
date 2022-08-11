import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const targetItem = state.items.find(item => item.id === action.payload.id);
            if (targetItem) {
                targetItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return sum + (item.price * item.count);
            },0);
        },
        removeProduct(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        reduceCountOfProduct(state, action) {
            const targetItem = state.items.find(item => item.id === action.payload);
            if (targetItem) {
                targetItem.count--;
            }
        },
        clearProducts(state) {
          state.items = [];
          state.totalPrice = 0;
        },
    }
});

export const {addProduct, removeProduct, reduceCountOfProduct, clearProducts} = cartSlice.actions;
export default cartSlice.reducer;
