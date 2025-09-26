import React, { useState, useEffect } from 'react';
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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../utils/hooks';
import { WORKER_CATEGORIES, MOCK_WORKERS } from '../utils/constants';
import { Worker, JobCategory } from '../types/worker';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [nearbyWorkers, setNearbyWorkers] = useState<Worker[]>(MOCK_WORKERS);

  const handleInstantHire = () => {
    Alert.alert(
      'Instant Hire',
      'Find workers available right now for immediate assistance',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Navigate to instant hire') },
      ]
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to search results or filter workers
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
    // Filter workers by category or navigate to category page
  };

  const handleWorkerPress = (worker: Worker) => {
    console.log('Selected worker:', worker.name);
    // Navigate to worker profile
  };

  const handleNotificationPress = () => {
    console.log('Open notifications');
    // Navigate to notifications screen
  };

  const renderCategoryItem = ({ item }: { item: typeof WORKER_CATEGORIES[0] }) => (
    <TouchableOpacity
      className="items-center p-4 bg-white rounded-lg mr-3 shadow-sm border border-gray-100"
      onPress={() => handleCategoryPress(item.id)}
      style={{ minWidth: 80 }}
    >
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: item.color + '20' }}
      >
        <Text className="text-xl">{item.icon}</Text>
      </View>
      <Text className="text-xs font-medium text-gray-700 text-center">
        {item.name}
      </Text>
      <Text className="text-xs text-gray-500">
        {item.workerCount}+
      </Text>
    </TouchableOpacity>
  );

  const renderWorkerCard = ({ item }: { item: Worker }) => (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100"
      onPress={() => handleWorkerPress(item)}
    >
      <View className="flex-row">
        {/* Worker Avatar */}
        <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mr-3">
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} className="w-16 h-16 rounded-full" />
          ) : (
            <Text className="text-xl font-bold text-gray-500">
              {item.name.charAt(0)}
            </Text>
          )}
        </View>

        {/* Worker Details */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
            {item.isVerified && (
              <View className="bg-blue-100 px-2 py-1 rounded-full">
                <Text className="text-xs text-blue-600 font-medium">✓ Verified</Text>
              </View>
            )}
          </View>

          <Text className="text-sm text-gray-600 capitalize mb-2">{item.category}</Text>

          {/* Rating and Reviews */}
          <View className="flex-row items-center mb-2">
            <Text className="text-yellow-500">⭐</Text>
            <Text className="text-sm font-medium text-gray-700 ml-1">
              {item.rating} ({item.reviewCount} reviews)
            </Text>
            <Text className="text-sm text-gray-500 mx-2">•</Text>
            <Text className="text-sm text-gray-500">{item.completedJobs} jobs</Text>
          </View>

          {/* Skills */}
          <View className="flex-row flex-wrap mb-2">
            {item.skills.slice(0, 2).map((skill, index) => (
              <View key={index} className="bg-gray-100 px-2 py-1 rounded mr-2 mb-1">
                <Text className="text-xs text-gray-600">{skill}</Text>
              </View>
            ))}
            {item.skills.length > 2 && (
              <Text className="text-xs text-gray-500 py-1">+{item.skills.length - 2} more</Text>
            )}
          </View>

          {/* Rate and Location */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-500">📍 {item.location}</Text>
              {item.distance && (
                <Text className="text-sm text-gray-500"> • {item.distance} km</Text>
              )}
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-900">₹{item.hourlyRate}/hr</Text>
              {item.isAvailable && (
                <View className="ml-2 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-white text-lg font-semibold">
                Hello, {user?.name || 'User'}! 👋
              </Text>
              <Text className="text-blue-100 text-sm">Find the perfect worker for your needs</Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center relative"
              onPress={handleNotificationPress}
            >
              <Text className="text-white text-lg">🔔</Text>
              {/* Notification badge */}
              <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-lg p-3 mb-4">
            <TextInput
              className="flex-1 text-base text-gray-900"
              placeholder="Search for services..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} className="ml-2">
              <Text className="text-blue-600 text-lg">🔍</Text>
            </TouchableOpacity>
          </View>

          {/* Instant Hire Button */}
          <TouchableOpacity
            className="bg-orange-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
            onPress={handleInstantHire}
          >
            <Text className="text-white text-base font-semibold mr-2">⚡ Instant Hire</Text>
            <Text className="text-orange-100 text-sm">Available Now</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Categories</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={WORKER_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          />
        </View>

        {/* Featured Workers Section */}
        <View className="px-6 py-2">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">Top Workers Near You</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={nearbyWorkers}
            renderItem={renderWorkerCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View className="px-6 py-4 mb-20">
          <Text className="text-xl font-bold text-gray-900 mb-4">Quick Actions</Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 bg-white rounded-lg p-4 mr-2 items-center shadow-sm border border-gray-100">
              <Text className="text-2xl mb-2">📋</Text>
              <Text className="text-sm font-medium text-gray-700">Post a Job</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 bg-white rounded-lg p-4 mx-2 items-center shadow-sm border border-gray-100">
              <Text className="text-2xl mb-2">💬</Text>
              <Text className="text-sm font-medium text-gray-700">Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 bg-white rounded-lg p-4 ml-2 items-center shadow-sm border border-gray-100">
              <Text className="text-2xl mb-2">📊</Text>
              <Text className="text-sm font-medium text-gray-700">My Jobs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;