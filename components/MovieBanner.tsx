import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface MovieItem {
  title: string;
  subtitle: string;
  year: string;
  backgroundImage: string;
}

interface MovieBannerProps {
  movies: MovieItem[];
  onPress?: (movieIndex: number) => void;
}

export const MovieBanner: React.FC<MovieBannerProps> = ({
  movies,
  onPress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = Dimensions.get('window');

  if (movies.length === 0) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 400,
      overflow: 'hidden',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    overlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      paddingBottom: 24,
      paddingHorizontal: 16,
    },
    content: {
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: '#fff',
      marginBottom: 6,
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 13,
      color: '#FFD700',
      marginBottom: 14,
      fontWeight: '500',
    },
    metaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      flexWrap: 'wrap',
      gap: 8,
    },
    metaTag: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    metaText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: '600',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 12,
      backgroundColor: 'transparent',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    activeDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
    },
  });

  const renderItem = ({ item, index }: { item: MovieItem; index: number }) => (
    <View style={styles.container}>
      <Image
        source={{ uri: item.backgroundImage }}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaTag}>
              <Text style={styles.metaText}>{item.year}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <Carousel
        width={width}
        height={400}
        data={movies}
        renderItem={renderItem}
        onSnapToItem={(index) => {
          setActiveIndex(index);
          onPress?.(index);
        }}
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={600}
        loop
      />
    </View>
  );
};
