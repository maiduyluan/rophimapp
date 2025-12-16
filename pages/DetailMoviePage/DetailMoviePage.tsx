import { LoadingPage } from '@/components/LoadingPage';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGetDetailMovie } from '@/services/api/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DetailMoviePage: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  const router = useRouter();
  const params = useLocalSearchParams();
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0];

  const { data: detailData, isLoading } = useGetDetailMovie(slug);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const scrollY = new Animated.Value(0);

  const movieData = detailData?.movie;
  const episodes = detailData?.episodes || [];

  const formattedMovieData = movieData;

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      backgroundColor: 'transparent',
      zIndex: 10,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      flex: 1,
      marginLeft: 12,
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    shareButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollContent: {
      paddingTop: 0,
    },
    posterSection: {
      height: 350,
      backgroundColor: colors.background,
      overflow: 'hidden',
    },
    posterImage: {
      width: '100%',
      height: '100%',
    },
    infoSection: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      gap: 16,
    },
    titleGroup: {
      gap: 4,
    },
    mainTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
    originTitle: {
      fontSize: 14,
      color: colors.tabIconDefault,
    },
    metaInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      gap: 4,
    },
    metaText: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '600',
    },
    ratingSection: {
      flexDirection: 'row',
      gap: 12,
    },
    ratingCard: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
      gap: 4,
    },
    ratingSource: {
      fontSize: 12,
      color: colors.tabIconDefault,
    },
    ratingValue: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFD700',
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: 16,
      borderRadius: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4A90E2',
      paddingVertical: 12,
      borderRadius: 8,
      gap: 8,
    },
    actionButtonSecondary: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      paddingVertical: 12,
      borderRadius: 8,
      gap: 8,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    descriptionSection: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    descriptionText: {
      fontSize: 14,
      color: colors.tabIconDefault,
      lineHeight: 20,
    },
    seasonsSection: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 12,
    },
    seasonTabs: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
    },
    seasonTab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    seasonTabActive: {
      backgroundColor: '#4A90E2',
    },
    seasonTabText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.tabIconDefault,
    },
    seasonTabTextActive: {
      color: '#fff',
    },
    episodeList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    episodeItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 8,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
    },
    episodeNumber: {
      fontSize: 12,
      fontWeight: '700',
      color: '#4A90E2',
    },
    episodeName: {
      display: 'none',
    },
    playIcon: {
      display: 'none',
    },
    relatedMoviesSection: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 12,
      paddingBottom: 40,
    },
    relatedMoviesGrid: {
      flexDirection: 'row',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    relatedMovieCard: {
      width: '31%',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#2a2a2a',
    },
    relatedMovieImage: {
      width: '100%',
      height: 160,
      backgroundColor: '#1a1a1a',
    },
    relatedMovieName: {
      fontSize: 11,
      color: colors.text,
      fontWeight: '600',
      padding: 8,
      lineHeight: 14,
    },
  });

  if (isLoading || !formattedMovieData) {
    return <LoadingPage message="Đang tải chi tiết phim..." />;
  }

  return (
    <SafeAreaView
      style={styles.safeContainer}
      edges={['bottom', 'left', 'right']}
    >
      <Animated.View
        style={[
          styles.headerBackdrop,
          {
            backgroundColor: headerBackgroundOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0, 0, 0, 0)', colors.background],
            }),
            marginTop: 0,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
          <Animated.Text style={[styles.headerTitle]} numberOfLines={1}>
            {formattedMovieData.name}
          </Animated.Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.posterSection}>
          <Image
            source={{
              uri: formattedMovieData.poster_url,
            }}
            style={styles.posterImage}
            resizeMode="stretch"
            defaultSource={require('@/assets/images/icon.png')}
          />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.titleGroup}>
            <Text style={styles.mainTitle}>{formattedMovieData.name}</Text>
            <Text style={styles.originTitle}>
              {formattedMovieData.origin_name}
            </Text>
          </View>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar" size={12} color="#4A90E2" />
              <Text style={styles.metaText}>{formattedMovieData.year}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flash" size={12} color="#FFD700" />
              <Text style={styles.metaText}>HD</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="globe" size={12} color="#FF6B6B" />
              <Text style={styles.metaText}>{formattedMovieData.type}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.metaText}>
                TMDb: {formattedMovieData.tmdb.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="play-circle" size={20} color="#fff" />
              <Text style={[styles.buttonText, { color: '#fff' }]}>Xem</Text>
            </Pressable>
            <Pressable style={styles.actionButtonSecondary}>
              <Ionicons name="bookmark" size={20} color={colors.text} />
              <Text style={styles.buttonText}>Lưu</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.descriptionText}>
            {formattedMovieData.name} ({formattedMovieData.origin_name}) - Năm{' '}
            {formattedMovieData.year}
            {'\n\n'}
            {formattedMovieData.content}
          </Text>
        </View>

        <View style={styles.seasonsSection}>
          <Text style={styles.sectionTitle}>Tập phim</Text>

          {episodes.length > 0 && (
            <>
              <View style={styles.seasonTabs}>
                {episodes.map((server, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.seasonTab,
                      selectedServerIndex === index && styles.seasonTabActive,
                    ]}
                    onPress={() => setSelectedServerIndex(index)}
                  >
                    <Text
                      style={[
                        styles.seasonTabText,
                        selectedServerIndex === index &&
                          styles.seasonTabTextActive,
                      ]}
                      numberOfLines={1}
                    >
                      {server.server_name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.episodeList}>
                {episodes[selectedServerIndex]?.server_data.map(
                  (episode, index) => (
                    <View key={episode.slug} style={styles.episodeItem}>
                      <Text style={styles.episodeNumber}>Tập {index + 1}</Text>
                      <Text style={styles.episodeName} numberOfLines={1}>
                        {episode.name}
                      </Text>
                      <Pressable style={styles.playIcon}>
                        <Ionicons name="play-circle" size={20} color="#fff" />
                      </Pressable>
                    </View>
                  )
                )}
              </View>
            </>
          )}
        </View>

        <View style={styles.relatedMoviesSection}>
          <Text style={styles.sectionTitle}>Phim liên quan</Text>
          <View style={styles.relatedMoviesGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Pressable key={i} style={styles.relatedMovieCard}>
                <Image
                  source={{
                    uri: formattedMovieData.poster_url,
                  }}
                  style={styles.relatedMovieImage}
                  resizeMode="cover"
                />
                <Text style={styles.relatedMovieName} numberOfLines={2}>
                  {formattedMovieData.name} - Phần {i}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
