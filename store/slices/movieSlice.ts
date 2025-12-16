import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
}

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  favorites: Movie[];
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  favorites: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    selectMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      if (!state.favorites.find((m) => m.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((m) => m.id !== action.payload);
    },
  },
});

export const { setMovies, selectMovie, addToFavorites, removeFromFavorites } =
  movieSlice.actions;
export default movieSlice.reducer;
