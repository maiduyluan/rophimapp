import { MovieBanner } from '@/components/MovieBanner';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGetNewMovies } from '@/services/api/hooks/newMovie';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomePage: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { data: moviesData, isLoading, error } = useGetNewMovies(1);

  useEffect(() => {
    if (moviesData) {
      console.log('📽️ New Movies API Response:', moviesData);
    }
  }, [moviesData]);

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

  const featuredMovie =
    moviesData?.items && moviesData.items.length > 0
      ? {
          title: moviesData.items[0].name,
          subtitle: moviesData.items[0].origin_name,
          imdbRating: moviesData.items[0].imdb?.vote_average?.toFixed(1) || '0',
          quality: '4K',
          genre: 'Phim Mới',
          year: moviesData.items[0].year.toString(),
          duration: '1h 52m',
          backgroundImage: moviesData.items[0].poster_url,
          castMembers: [
            { id: '1', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: '2', avatar: 'https://i.pravatar.cc/150?img=2' },
            { id: '3', avatar: 'https://i.pravatar.cc/150?img=3' },
            { id: '4', avatar: 'https://i.pravatar.cc/150?img=4' },
            { id: '5', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: '6', avatar: 'https://i.pravatar.cc/150?img=6' },
          ],
        }
      : {
          title: 'Phi Vụ Thế Kỷ: Thoát Án Thoát Hiện',
          subtitle: "Now You See Me 3: Now You Don't",
          imdbRating: '6.2',
          quality: '4K',
          genre: 'Tâm lý',
          year: '2025',
          duration: '1h 52m',
          backgroundImage: 'https://picsum.photos/400/500?random=1',
          castMembers: [
            { id: '1', avatar: 'https://i.pravatar.cc/150?img=1' },
            { id: '2', avatar: 'https://i.pravatar.cc/150?img=2' },
            { id: '3', avatar: 'https://i.pravatar.cc/150?img=3' },
            { id: '4', avatar: 'https://i.pravatar.cc/150?img=4' },
            { id: '5', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: '6', avatar: 'https://i.pravatar.cc/150?img=6' },
          ],
        };

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
            title={featuredMovie.title}
            subtitle={featuredMovie.subtitle}
            imdbRating={featuredMovie.imdbRating}
            quality={featuredMovie.quality}
            genre={featuredMovie.genre}
            year={featuredMovie.year}
            duration={featuredMovie.duration}
            backgroundImage={featuredMovie.backgroundImage}
            castMembers={featuredMovie.castMembers}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
