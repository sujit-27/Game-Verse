import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  console.log("API KEY FETCHED:", apiKey);
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const res = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=10&page=${randomPage}`);
  return res.data.results;

});


const gamesSlice = createSlice({
  name: "games",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default gamesSlice.reducer
