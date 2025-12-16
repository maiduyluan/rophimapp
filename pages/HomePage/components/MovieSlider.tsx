import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Movie {
  _id: string;
  name: string;
  origin_name: string;
  poster_url: string;
  year?: number;
  episode_current?: string;
  quality?: string;
}

interface MovieSliderProps {
  movies: Movie[];
  title: string;
  onMoviePress?: (movie: Movie) => void;
  onViewMore?: () => void;
  gradientColors?: string[];
}

export const MovieSlider: React.FC<MovieSliderProps> = ({
  movies,
  title,
  onMoviePress,
  onViewMore,
  gradientColors = ['#7B68EE', '#4A90E2', '#FF6B6B'],
}) => {
  const { width } = Dimensions.get('window');
  const movieCardWidth = (width - 40) / 3;

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#fff',
    },
    viewMoreButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    viewMoreText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#4A90E2',
    },
    scrollContainer: {
      overflow: 'hidden',
      borderRadius: 8,
    },
    moviesGrid: {
      flexDirection: 'row',
      gap: 12,
    },
    movieCard: {
      width: movieCardWidth,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#2a2a2a',
    },
    movieImage: {
      width: '100%',
      height: (movieCardWidth * 3) / 2,
      backgroundColor: '#1a1a1a',
    },
    movieOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-end',
      padding: 8,
    },
    movieBadges: {
      flexDirection: 'row',
      gap: 4,
      marginBottom: 8,
      flexWrap: 'wrap',
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#fff',
    },
    movieTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 4,
      lineHeight: 16,
    },
    movieSubtitle: {
      fontSize: 10,
      color: '#ccc',
      lineHeight: 14,
    },
  });

  if (movies.length === 0) {
    return null;
  }

  const displayedMovies = movies.slice(0, 6);

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <MaskedView
            maskElement={
              <Text
                style={[
                  styles.title,
                  { paddingHorizontal: 2, paddingVertical: 2 },
                ]}
              >
                {title}
              </Text>
            }
          >
            <LinearGradient
              colors={gradientColors as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 40, width: '100%' }}
            />
          </MaskedView>
        </View>
        {displayedMovies.length > 0 && (
          <Pressable
            style={styles.viewMoreButton}
            onPress={onViewMore}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Text style={styles.viewMoreText}>Xem toàn bộ →</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.moviesGrid}>
          {displayedMovies.map((movie) => (
            <Pressable
              key={movie._id}
              style={styles.movieCard}
              onPress={() => onMoviePress?.(movie)}
              android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Image
                source={{ uri: movie.poster_url }}
                style={styles.movieImage}
                resizeMode="cover"
              />
              <View style={styles.movieOverlay}>
                {(movie.quality || movie.episode_current) && (
                  <View style={styles.movieBadges}>
                    {movie.quality && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{movie.quality}</Text>
                      </View>
                    )}
                    {movie.episode_current && (
                      <View
                        style={[
                          styles.badge,
                          { backgroundColor: 'rgba(74, 144, 226, 0.8)' },
                        ]}
                      >
                        <Text style={styles.badgeText}>
                          {movie.episode_current}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                <Text style={styles.movieTitle}>{movie.name}</Text>
                <Text style={styles.movieSubtitle}>{movie.origin_name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
