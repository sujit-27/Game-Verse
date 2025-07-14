import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export const fetchNewGames = createAsyncThunk("newGames/fetch", async () => {
  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const res = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&dates=${thirtyDaysAgo},${today}&ordering=-released&page_size=10`
  );

  return res.data.results;
});

const whatsnewSlice = createSlice({
  name: 'newGames',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewGames.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default whatsnewSlice.reducer;
