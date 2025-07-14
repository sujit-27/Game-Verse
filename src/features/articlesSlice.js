import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export const fetchRecommendedArticles = createAsyncThunk("recommended/fetch", async () => {
  const res = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=10`);
  return res.data.results;
});

export const fetchGameDescriptionBySlug = createAsyncThunk(
  'articles/fetchGameDescriptionBySlug',
  async (slug) => {
    const res = await axios.get(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`);
    const fullDescription = res.data.description_raw || 'No description available';
    const firstSentence = fullDescription.split('. ')[1] + '.';
    return { slug, description: firstSentence };
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    data: [],
    descriptions: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRecommendedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGameDescriptionBySlug.fulfilled, (state, action) => {
        state.descriptions[action.payload.slug] = action.payload.description;
      });
  },
});

export default articlesSlice.reducer;
