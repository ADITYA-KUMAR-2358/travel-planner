import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { destinationService } from '../../services/destinationService';

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      return await destinationService.getDestinations(params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchFeaturedDestinations = createAsyncThunk(
  'destinations/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      return await destinationService.getFeaturedDestinations();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchDestinationById = createAsyncThunk(
  'destinations/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await destinationService.getDestinationById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState: {
    items: [],
    featured: [],
    currentDestination: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      pages: 1,
      total: 0
    },
    filters: {
      search: '',
      category: '',
      priceMin: 0,
      priceMax: 10000
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        priceMin: 0,
        priceMax: 10000
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.destinations;
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total
        };
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedDestinations.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(fetchDestinationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDestinationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDestination = action.payload;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters } = destinationsSlice.actions;
export default destinationsSlice.reducer;
