import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortItem: {
        value: 'популярности ( возрастанию )',
        sortType: 'rating',
        order: 'asc',
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortItem(state, action) {
            state.sortItem = action.payload;
        }
    }
});

export const {setCategoryId, setSortItem} = filterSlice.actions;
export default filterSlice.reducer;
