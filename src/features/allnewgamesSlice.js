import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiKey = import.meta.env.VITE_RAWG_API_KEY;


export const fetchNewGamesByPage = createAsyncThunk("newGames/fetch", async (page) => {
  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const res = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&dates=${thirtyDaysAgo},${today}&page=${page}&ordering=-released&page_size=20`
  );

  return res.data.results;
});



const allnewgamesSlice = createSlice({
  name: "allnewgames",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewGamesByPage.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNewGamesByPage.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchNewGamesByPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default allnewgamesSlice.reducer
