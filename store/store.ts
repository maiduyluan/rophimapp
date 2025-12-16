import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Auth/authSlice';
import cartoonReducer from './slices/CartoonPage/cartoonSlice';
import cinemaReducer from './slices/CinemaPage/cinemaSlice';
import homeReducer from './slices/HomePage/homeSlice';
import seriesReducer from './slices/SeriresSlice/seriesSlice';
import themeReducer from './slices/themeSlice';
import tvshowsReducer from './slices/TVShowsPage/tvshowsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    home: homeReducer,
    cartoon: cartoonReducer,
    cinema: cinemaReducer,
    series: seriesReducer,
    tvshows: tvshowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
