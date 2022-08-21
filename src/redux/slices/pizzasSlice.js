import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'loading',
    pizzas: [],
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (params) => {
        const {searchValue, sortType, order, categorySearch} = params;
        const response = await axios.get(`https://62e9731f3a5f1572e86aedb9.mockapi.io/pizzas?${categorySearch}`,{
            params: {
                search: searchValue,
                sortBy: sortType,
                order: order,
            }
        });
        return response.data;
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.pizzas = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'done';
            state.pizzas = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.pizzas = [];
        },
    }
});

export const selectPizzas = (state) => state.pizzas;
export default pizzasSlice.reducer;
