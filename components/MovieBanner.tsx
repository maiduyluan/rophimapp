import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface CastMember {
  id: string;
  avatar: string;
}

interface MovieBannerProps {
  title: string;
  subtitle: string;
  imdbRating: string;
  quality: string;
  genre: string;
  year: string;
  duration: string;
  backgroundImage: string;
  castMembers?: CastMember[];
  onPress?: () => void;
}

export const MovieBanner: React.FC<MovieBannerProps> = ({
  title,
  subtitle,
  imdbRating,
  quality,
  genre,
  year,
  duration,
  backgroundImage,
  castMembers = [],
  onPress,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 400,
      marginBottom: 20,
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
    castContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    castAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: '#1a1a1a',
      backgroundColor: '#666',
    },
    castAvatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: 18,
    },
    buttonContainer: {
      marginTop: 16,
      borderRadius: 8,
      overflow: 'hidden',
    },
    buttonWatch: {
      marginTop: 16,
      borderRadius: 8,
      overflow: 'hidden',
      height: 48,
    },
    buttonGradientBg: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#91d2d1ff',
    },
    buttonGradientBgLight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 8,
      backgroundColor: '#FFA500',
      opacity: 0.3,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: backgroundImage }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <View style={styles.metaContainer}>
              <View style={styles.metaTag}>
                <Text style={styles.metaText}>IMDb {imdbRating}</Text>
              </View>
              <View style={styles.metaTag}>
                <Text style={styles.metaText}>{quality}</Text>
              </View>
              <View style={styles.metaTag}>
                <Text style={styles.metaText}>{genre}</Text>
              </View>
              <View style={styles.metaTag}>
                <Text style={styles.metaText}>{year}</Text>
              </View>
              <View style={styles.metaTag}>
                <Text style={styles.metaText}>{duration}</Text>
              </View>
            </View>

            {castMembers.length > 0 && (
              <View style={styles.castContainer}>
                {castMembers.slice(0, 6).map((member, index) => (
                  <View key={member.id} style={styles.castAvatar}>
                    <Image
                      source={{ uri: member.avatar }}
                      style={styles.castAvatarImage}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
