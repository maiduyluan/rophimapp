import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../config';
import { Genre } from './types';

export const useGetGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async (): Promise<Genre[]> => {
      const response = await apiClient.get<Genre[]>('the-loai');
      return response.data;
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};
