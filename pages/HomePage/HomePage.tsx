import { LoadingPage } from '@/components/LoadingPage';
import { MovieBanner } from '@/components/MovieBanner';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGetNewMovies } from '@/services/api/hooks/newMovie';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomePage: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { data: moviesData, isLoading } = useGetNewMovies(1);

  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 16,
    },
  });
  if (isLoading) {
    return <LoadingPage message="Đang tải phim..." />;
  }

  if (!moviesData?.items || moviesData.items.length === 0) {
    return <LoadingPage message="Không có dữ liệu" />;
  }

  const carouselMovies = moviesData.items.slice(0, 6).map((movie) => ({
    title: movie.name,
    subtitle: movie.origin_name,
    year: movie.year.toString(),
    backgroundImage: movie.poster_url,
  }));

  return (
    <SafeAreaView
      style={styles.safeContainer}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <MovieBanner
            movies={carouselMovies}
            onPress={(movieIndex) => {
              // Handle movie press
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
