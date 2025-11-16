import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import destinationsReducer from './slices/destinationsSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    bookings: bookingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
