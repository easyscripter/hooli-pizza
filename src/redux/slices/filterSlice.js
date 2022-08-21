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
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortItem = action.payload.sortItem;
        }
    }
});
export const selectSortItem = (state) => state.filter.sortItem;
export const selectCategoryId = (state) => state.filter.categoryId;
export const {setCategoryId, setSortItem, setFilters} = filterSlice.actions;
export default filterSlice.reducer;
