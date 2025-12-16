import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://api.example.com';

export const useGetMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      return response.json();
    },
  });
};

export const useGetMovieById = (id: string | null) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!response.ok) throw new Error('Failed to fetch movie');
      return response.json();
    },
    enabled: !!id,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/movies/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Failed to search movies');
      return response.json();
    },
    enabled: query.length > 0,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieData: { title: string; description: string }) => {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) throw new Error('Failed to create movie');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      movieData,
    }: {
      id: string;
      movieData: { title?: string; description?: string };
    }) => {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) throw new Error('Failed to update movie');
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['movie', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete movie');
      return response.json();
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.removeQueries({ queryKey: ['movie', deletedId] });
    },
  });
};
