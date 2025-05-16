import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://dummyjson.com/products?limit=200');
  console.log(response.data.products);
  return response.data.products;
});

const PostsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchPosts.fulfilled, (state, actions) => {
        (state.loading = false), (state.items = actions.payload);
      })
      .addCase(fetchPosts.rejected, (state, actions) => {
        (state.loading = false), (state.error = actions.error.message);
      });
  },
});

export default PostsSlice.reducer;
