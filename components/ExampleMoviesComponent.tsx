import { useGetMovies } from '@/services/api/queries';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMovie, setMovies } from '@/store/slices/movieSlice';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export function ExampleMoviesComponent() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movie);
  const { data, isLoading, error } = useGetMovies();

  useEffect(() => {
    if (data) {
      dispatch(setMovies(data));
    }
  }, [data, dispatch]);

  const handleSelectMovie = (movieId: string) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      dispatch(selectMovie(movie));
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 16 }}>
        Movies ({movies.length})
      </Text>
      {movies.map((movie) => (
        <View
          key={movie.id}
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {movie.title}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
            {movie.description}
          </Text>
          <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
            Rating: {movie.rating}/10
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
