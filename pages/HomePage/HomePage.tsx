import { LoadingPage } from '@/components/LoadingPage';
import { Header } from '@/components/layout';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CategoryCard } from '@/pages/HomePage/components/CategoryCard';
import { GenresDrawer } from '@/pages/HomePage/components/GenresDrawer';
import { MovieBanner } from '@/pages/HomePage/components/MovieBanner';
import { MovieSlider } from '@/pages/HomePage/components/MovieSlider';
import { useGetGenres, useGetNewMovies } from '@/services/api/hooks';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomePage: React.FC = () => {
  const [showAllGenres, setShowAllGenres] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').width)
  ).current;

  const { data: moviesData, isLoading } = useGetNewMovies(1);
  const { data: genresData } = useGetGenres();

  useEffect(() => {
    if (showAllGenres) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [showAllGenres, slideAnim]);

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
      gap: 24,
      paddingBottom: 16,
    },
    categorySection: {
      paddingHorizontal: 16,
    },
    titleSection: {
      fontSize: 28,
      fontWeight: '700',
      color: '#fff',
    },
    categoriesContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    movieSliderSection: {
      gap: 24,
      backgroundColor: '#21232fff',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
  });

  if (isLoading || !moviesData?.items || moviesData.items.length === 0) {
    return <LoadingPage message="Đang tải phim..." />;
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
      <Header onMenuPress={() => {}} onSearchPress={() => {}} />
      <View style={{ flex: 1 }}>
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

          <View style={styles.categorySection}>
            <Text style={styles.titleSection}>Bạn đang quan tâm gì?</Text>
            <CategoryCard
              genresData={genresData || []}
              onViewMore={() => setShowAllGenres(true)}
            />
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <View style={styles.movieSliderSection}>
              <MovieSlider
                title="Phim Hàn Quốc mới"
                movies={moviesData?.items.slice(0, 6) || []}
                gradientColors={['#7B68EE', '#4A90E2', '#FF6B6B']}
                onMoviePress={(movie) => {
                  // Handle movie press
                }}
                onViewMore={() => {
                  // Navigate to all Korean movies
                }}
              />

              <MovieSlider
                title="Phim Trung Quốc mới"
                movies={moviesData?.items.slice(0, 6) || []}
                gradientColors={['#FF6B6B', '#FFA500', '#FFD700']}
                onMoviePress={(movie) => {
                  // Handle movie press
                }}
                onViewMore={() => {
                  // Navigate to all Chinese movies
                }}
              />

              <MovieSlider
                title="Phim US-UK mới"
                movies={moviesData?.items.slice(0, 6) || []}
                gradientColors={['#4A90E2', '#00CED1', '#32CD32']}
                onMoviePress={(movie) => {
                  // Handle movie press
                }}
                onViewMore={() => {
                  // Navigate to all Chinese movies
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <GenresDrawer
        visible={showAllGenres}
        genres={genresData || []}
        slideAnim={slideAnim}
        onClose={() => setShowAllGenres(false)}
        title="Các chủ đề"
      />
    </SafeAreaView>
  );
};
