import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export const fetchGameDetails = createAsyncThunk(
  "gameDetails/fetchGameDetails",
  async (id) => {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
    return response.data;
  }
);

const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearGameDetails: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearGameDetails } = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer;
