import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppDispatch } from '@/store/hooks';
import { setColorScheme } from '@/store/slices/themeSlice';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

interface GenreItem {
  _id: string;
  name: string;
  slug: string;
}

interface CountryItem {
  _id: string;
  name: string;
  slug?: string;
}

interface OptionsDrawerProps {
  visible: boolean;
  genres: GenreItem[];
  countries?: CountryItem[];
  slideAnim: Animated.Value;
  onClose: () => void;
  onGenrePress?: (genre: GenreItem) => void;
  onCountryPress?: (country: CountryItem) => void;
  onYearPress?: (year: number) => void;
  onToggleTheme?: (isDark: boolean) => void;
  title?: string;
}

export const OptionsDrawer: React.FC<OptionsDrawerProps> = ({
  visible,
  genres,
  countries = [],
  slideAnim,
  onClose,
  onGenrePress,
  onCountryPress,
  onYearPress,
  onToggleTheme,
  title = 'Tùy chọn',
}) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const dispatch = useAppDispatch();
  const isDark = colorScheme === 'dark';
  const [openYears, setOpenYears] = useState(true);
  const [openGenres, setOpenGenres] = useState(false);
  const [openCountries, setOpenCountries] = useState(false);

  const years = useMemo(() => {
    const start = 2000;
    const end = 2025;
    const arr: number[] = [];
    for (let y = start; y <= end; y++) arr.push(y);
    return arr.reverse();
  }, []);

  const categoryColors = [
    '#4A90E2',
    '#9B8FC4',
    '#4CAF50',
    '#9C27B0',
    '#FF6B6B',
    '#FFA500',
    '#00BCD4',
    '#FF69B4',
  ];

  const styles = StyleSheet.create({
    drawerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: visible ? 'auto' : 'none',
    },
    drawerContent: {
      flex: 1,
      backgroundColor: colors.background,
    },
    drawerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.08)',
    },
    drawerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      flex: 1,
    },
    closeButton: {
      padding: 8,
    },
    closeButtonText: {
      fontSize: 28,
      color: colors.text,
    },
    section: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    sectionBody: {
      marginTop: 12,
      gap: 12,
    },
    yearItem: {
      paddingVertical: 10,
    },
    yearText: {
      color: colors.text,
      fontSize: 14,
    },
    pill: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginRight: 8,
      marginBottom: 8,
      minWidth: 72,
      alignItems: 'center',
    },
    pillText: {
      color: '#fff',
      fontWeight: '600',
    },
    pillsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  const handleToggleTheme = (value: boolean) => {
    dispatch(setColorScheme(value ? 'dark' : 'light'));
    if (onToggleTheme) onToggleTheme(value);
  };

  const handleYearPress = (year: number) => {
    if (onYearPress) return onYearPress(year);
    router.push({ pathname: '/search', params: { year: String(year) } });
  };

  const handleGenrePress = (genre: GenreItem) => {
    if (onGenrePress) return onGenrePress(genre);
    router.push({
      pathname: '/genre-movies',
      params: { slug: genre.slug, title: genre.name },
    });
  };

  const handleCountryPress = (country: CountryItem) => {
    if (onCountryPress) return onCountryPress(country);
    router.push({
      pathname: '/country-movies',
      params: { slug: country.slug ?? country.name, title: country.name },
    });
  };

  return (
    <View style={styles.drawerContainer}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: slideAnim }],
          },
          styles.drawerContent,
        ]}
      >
        <View style={styles.drawerHeader}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
          <Text style={styles.drawerTitle}>{title}</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Chế độ xem phim</Text>
              <Switch value={isDark} onValueChange={handleToggleTheme} />
            </View>
          </View>

          <View style={styles.section}>
            <Pressable
              onPress={() => setOpenYears((s) => !s)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionTitle}>Năm phim</Text>
              <Text style={{ color: colors.text }}>
                {openYears ? '−' : '+'}
              </Text>
            </Pressable>
            {openYears && (
              <View style={styles.sectionBody}>
                <View style={styles.pillsRow}>
                  {years.map((y) => (
                    <Pressable
                      key={y}
                      style={styles.pill}
                      onPress={() => handleYearPress(y)}
                    >
                      <View style={{ backgroundColor: 'transparent' }}>
                        <Text style={[styles.pillText, { color: colors.text }]}>
                          {String(y)}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Pressable
              onPress={() => setOpenGenres((s) => !s)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionTitle}>Thể loại</Text>
              <Text style={{ color: colors.text }}>
                {openGenres ? '−' : '+'}
              </Text>
            </Pressable>
            {openGenres && (
              <View style={styles.sectionBody}>
                <View style={styles.pillsRow}>
                  {genres.map((g, idx) => (
                    <Pressable
                      key={g._id}
                      style={[
                        styles.pill,
                        {
                          backgroundColor:
                            categoryColors[idx % categoryColors.length],
                        },
                      ]}
                      onPress={() => handleGenrePress(g)}
                    >
                      <Text style={styles.pillText}>{g.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Pressable
              onPress={() => setOpenCountries((s) => !s)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionTitle}>Quốc gia</Text>
              <Text style={{ color: colors.text }}>
                {openCountries ? '−' : '+'}
              </Text>
            </Pressable>
            {openCountries && (
              <View style={styles.sectionBody}>
                <View style={styles.pillsRow}>
                  {countries.map((c, idx) => (
                    <Pressable
                      key={c._id}
                      style={[
                        styles.pill,
                        {
                          backgroundColor:
                            categoryColors[idx % categoryColors.length],
                        },
                      ]}
                      onPress={() => handleCountryPress(c)}
                    >
                      <Text style={styles.pillText}>{c.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};
