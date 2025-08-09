import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  lastUpdatedAt: 0
};

export const searchProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
      state.lastUpdatedAt = Date.now();
    },
    clearSearch: state => {
      state.search = '';
      state.lastUpdatedAt = Date.now();
    }
  }
});

// Action creators are generated for each case reducer function
export const { searchProduct, clearSearch } = searchProductSlice.actions;

export default searchProductSlice.reducer;
