import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: ''
};

export const searchProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: state => {
      state.search = '';
    }
  }
});

// Action creators are generated for each case reducer function
export const { searchProduct, clearSearch } = searchProductSlice.actions;

export default searchProductSlice.reducer;
