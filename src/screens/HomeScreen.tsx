import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppSelector } from '../utils/hooks';
import { WORKER_CATEGORIES, MOCK_WORKERS, COLORS } from '../utils/constants';
import { CategoryCard } from '../components';
import { Worker } from '../types/worker';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [nearbyWorkers, setNearbyWorkers] = useState<Worker[]>(MOCK_WORKERS);

  const handleInstantHire = () => {
    navigation.navigate('InstantFind' as never);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      navigation.navigate('SearchResults', { searchQuery });
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
    navigation.navigate('SearchResults', { category: categoryId });
  };

  const handleWorkerPress = (worker: Worker) => {
  navigation.navigate('ProviderProfile', { workerId: worker.id });
  };

  const handleNotificationPress = () => {
    console.log('Open notifications');
    // Navigate to notifications screen
  };

  const renderCategoryGridItem = ({ item }: { item: typeof WORKER_CATEGORIES[0] }) => (
    <CategoryCard title={item.name} icon={item.icon} onPress={() => handleCategoryPress(item.id)} />
  );

  const renderFeaturedCard = ({ item }: { item: Worker }) => (
    <TouchableOpacity
      className="w-64 mr-4 bg-white rounded-3xl overflow-hidden border border-gray-100"
      onPress={() => handleWorkerPress(item)}
      style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 }}
    >
      <View className="h-28 items-center justify-center relative" style={{ backgroundColor: '#F0F9FF' }}>
        {item.profileImage ? (
          <Image source={{ uri: item.profileImage }} className="w-16 h-16 rounded-full" />
        ) : (
          <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
            <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[600] }}>{item.name.charAt(0)}</Text>
          </View>
        )}
        <View className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex-row items-center">
          <Text className="text-yellow-500 text-xs mr-1">⭐</Text>
          <Text className="text-xs font-semibold" style={{ color: COLORS.GRAY[800] }}>{item.rating}</Text>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-base font-bold" style={{ color: COLORS.GRAY[900] }}>{item.name}</Text>
        <Text className="text-xs capitalize mt-0.5 mb-3" style={{ color: COLORS.GRAY[600] }}>{item.category}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold" style={{ color: COLORS.PRIMARY }}>${item.hourlyRate}</Text>
          <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>/hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.WHITE }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Modern Header */}
        <View className="px-6 pt-8 pb-6" style={{ backgroundColor: COLORS.WHITE }}>
          <View className="flex-row items-center justify-between mb-5">
            <View>
              <Text className="text-sm" style={{ color: COLORS.GRAY[500] }}>Welcome back</Text>
              <Text className="text-2xl font-extrabold" style={{ color: COLORS.GRAY[900] }}>
                {user?.name || 'There'}
              </Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center relative" onPress={handleNotificationPress}>
              <Text className="text-xl" style={{ color: COLORS.GRAY[700] }}>🔔</Text>
              <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center" style={{ backgroundColor: COLORS.ERROR }}>
                <Text className="text-xs font-bold" style={{ color: COLORS.WHITE }}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center rounded-full px-4 py-3 border mb-4"
            style={{ backgroundColor: COLORS.GRAY[50], borderColor: COLORS.GRAY[200] }}
          >
            <Text className="text-lg mr-3" style={{ color: COLORS.GRAY[400] }}>🔍</Text>
            <TextInput
              className="flex-1 text-base"
              placeholder="Search services, skills, providers"
              placeholderTextColor={COLORS.GRAY[400]}
              style={{ color: COLORS.GRAY[700] }}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleInstantHire}>
              <Text className="text-lg" style={{ color: COLORS.PRIMARY }}>⚡</Text>
            </TouchableOpacity>
          </View>

          {/* Highlight Card */}
          <TouchableOpacity
            className="rounded-2xl p-4 flex-row items-center justify-between"
            onPress={handleInstantHire}
            style={{ backgroundColor: '#EEF2FF' }}
          >
            <View className="flex-1 mr-3">
              <Text className="text-base font-bold mb-1" style={{ color: COLORS.PRIMARY_DARK }}>Instant Find</Text>
              <Text className="text-xs" style={{ color: COLORS.GRAY[600] }}>Get matched with a provider in minutes</Text>
            </View>
            <View className="w-12 h-12 rounded-xl items-center justify-center" style={{ backgroundColor: COLORS.WHITE }}>
              <Text className="text-2xl">⚡</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-2">
          
        </View>

        {/* Categories Grid */}
        <View className="px-6 pt-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories' as never)}>
              <Text className="font-medium" style={{ color: COLORS.PRIMARY }}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={WORKER_CATEGORIES}
            renderItem={renderCategoryGridItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 4 }}
          />
        </View>

        {/* Featured Carousel */}
        <View className="px-6 pt-2">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>Featured Providers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SearchResults', {})}>
              <Text className="font-medium" style={{ color: COLORS.PRIMARY }}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={nearbyWorkers.slice(0, 6)}
            renderItem={renderFeaturedCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          />
        </View>

        <View className="pb-24" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;