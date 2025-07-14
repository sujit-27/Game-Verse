import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiKey = import.meta.env.VITE_RAWG_API_KEY;


export const fetchTrendingGamesByPage = createAsyncThunk(
  "games/fetchNewGamesByPage",
  async (page) => {
    const response = await fetch(`https://api.rawg.io/api/games?ordering=-added&page_size=20&page=${page}&key=${apiKey}`);
    const data = await response.json();
    return data.results;
  }
);

const allgamesSlice = createSlice({
  name: "allgames",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingGamesByPage.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTrendingGamesByPage.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTrendingGamesByPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default allgamesSlice.reducer
