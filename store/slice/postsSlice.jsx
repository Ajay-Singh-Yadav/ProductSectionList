import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (skip = 0) => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=50&skip=${skip}`,
    );
    return {data: response.data.products, skip};
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    skip: 0,
    hasMore: true,
  },
  reducers: {
    resetPosts: state => {
      state.items = [];
      state.skip = 0;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const newItems = action.payload.data;
        state.items = [...state.items, ...newItems];
        state.skip += newItems.length;
        state.hasMore = newItems.length > 0;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
      });
  },
});

export const {resetPosts} = postsSlice.actions;
export default postsSlice.reducer;
