import { LoadingPage } from '@/components/LoadingPage';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CategoryCard } from '@/pages/HomePage/components/CategoryCard';
import { GenresDrawer } from '@/pages/HomePage/components/GenresDrawer';
import { MovieBanner } from '@/pages/HomePage/components/MovieBanner';
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
      paddingBottom: 16,
    },
    section: {
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    titleSection: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    categoriesContainer: {
      flexDirection: 'row',
      marginTop: 12,
      gap: 8,
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

          <View style={styles.section}>
            <Text style={styles.titleSection}>Bạn đang quan tâm gì?</Text>
            <CategoryCard
              genresData={genresData || []}
              onViewMore={() => setShowAllGenres(true)}
            />
          </View>
        </ScrollView>

        <GenresDrawer
          visible={showAllGenres}
          genres={genresData || []}
          slideAnim={slideAnim}
          onClose={() => setShowAllGenres(false)}
          title="Các chủ đề"
        />
      </View>
    </SafeAreaView>
  );
};
