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
            state.items.filter(item => item.id !== action.payload)
        },
        clearProducts(state) {
          state.items = [];
        },
    }
});

export const {addProduct, removeProduct, clearProducts} = cartSlice.actions;
export default cartSlice.reducer;
