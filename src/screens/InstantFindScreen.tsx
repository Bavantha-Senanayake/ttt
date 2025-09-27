import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, MOCK_WORKERS, WORKER_CATEGORIES } from '../utils/constants';
import { Worker } from '../types/worker';

const { width } = Dimensions.get('window');

const InstantFindScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Worker[]>(MOCK_WORKERS);
  const [isSearching, setIsSearching] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHireWorker = (worker: Worker) => {
    console.log('Hiring worker:', worker.name);
    // Handle hire logic here
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search
      const filtered = MOCK_WORKERS.filter(worker =>
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filtered);
      setIsSearching(false);
    } else {
      setSearchResults(MOCK_WORKERS);
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    if (categoryId === selectedCategory) {
      setSearchResults(MOCK_WORKERS);
    } else {
      const filtered = MOCK_WORKERS.filter(worker => 
        worker.category.toLowerCase() === categoryId.toLowerCase()
      );
      setSearchResults(filtered);
    }
  };

  const handleLocationFetch = () => {
    console.log('Fetching current location...');
    // Handle location fetch logic here
  };

  const handleShowMoreCategories = () => {
    console.log('Show more categories');
    // Handle showing more categories - could navigate to a full categories screen
    // or expand the current view
  };

  const renderWorkerCard = ({ item }: { item: Worker }) => (
    <View 
      className="bg-white rounded-2xl p-4 mb-3 mx-4 flex-row items-center"
      style={{
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {/* Worker Avatar */}
      <View className="mr-4">
        {item.profileImage ? (
          <Image 
            source={{ uri: item.profileImage }} 
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <View className="w-16 h-16 rounded-full items-center justify-center"
            style={{ backgroundColor: COLORS.GRAY[200] }}>
            <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[600] }}>
              {item.name.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      {/* Worker Info */}
      <View className="flex-1">
        <Text className="text-lg font-bold mb-1" style={{ color: COLORS.GRAY[900] }}>
          {item.name}
        </Text>
        <Text className="text-sm capitalize mb-2" style={{ color: COLORS.GRAY[600] }}>
          {item.category}
        </Text>
        
        {/* Rating and Distance */}
        <View className="flex-row items-center">
          <Text className="text-orange-500 text-xs mr-1">⭐</Text>
          <Text className="text-xs font-medium mr-3" style={{ color: COLORS.GRAY[700] }}>
            {item.rating}
          </Text>
          {item.distance && (
            <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>
              {item.distance} km
            </Text>
          )}
        </View>
      </View>

      {/* Hire Button */}
      <TouchableOpacity
        className="py-2 px-6 rounded-full"
        style={{ backgroundColor: COLORS.PRIMARY }}
        onPress={() => handleHireWorker(item)}
      >
        <Text className="text-sm font-semibold" style={{ color: COLORS.WHITE }}>
          Hire
        </Text>
      </TouchableOpacity>
    </View>
  );



  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.WHITE }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b"
        style={{ borderBottomColor: COLORS.GRAY[100] }}>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full mr-3"
          style={{ backgroundColor: COLORS.GRAY[100] }}
          onPress={handleBack}
        >
          <Text className="text-lg" style={{ color: COLORS.GRAY[600] }}>←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>
          Instant Find
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View className="h-64 mx-4 my-4 rounded-2xl overflow-hidden relative"
          style={{ backgroundColor: COLORS.GRAY[100] }}>
          {/* Placeholder for map - you can integrate with react-native-maps */}
          <View className="flex-1 items-center justify-center relative"
            style={{
              backgroundColor: '#E0F2FE',
              // You can add a background image or actual map here
            }}>
            <Text className="text-lg font-semibold mb-2" style={{ color: COLORS.GRAY[700] }}>
              San Francisco
            </Text>
            <Text className="text-sm" style={{ color: COLORS.GRAY[500] }}>
              Map showing available workers
            </Text>
            
            {/* Map pins simulation */}
            <View className="absolute top-16 left-20 w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS.PRIMARY }}>
            </View>
            <View className="absolute top-24 right-16 w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS.PRIMARY }}>
            </View>
            <View className="absolute bottom-20 left-16 w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS.PRIMARY }}>
            </View>
          </View>
          
          {/* Location Fetch Button */}
          <TouchableOpacity
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full items-center justify-center"
            style={{
              backgroundColor: COLORS.WHITE,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
            onPress={handleLocationFetch}
          >
            <Text className="text-lg">📍</Text>
          </TouchableOpacity>
        </View>

        {/* Search Results Workers Section */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>
              {searchQuery ? 'Search Results' : 'Available Workers'}
            </Text>
            <Text className="text-sm" style={{ color: COLORS.GRAY[500] }}>
              {searchResults.length} found
            </Text>
          </View>

          {isSearching ? (
            <View className="flex-1 items-center justify-center py-8">
              <Text style={{ color: COLORS.GRAY[500] }}>Searching...</Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderWorkerCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Bottom Spacing */}
        <View className="pb-32" />
      </ScrollView>

      {/* Bottom Search and Categories Section */}
      <View className="absolute bottom-0 left-0 right-0 p-4 border-t"
        style={{ 
          backgroundColor: COLORS.WHITE,
          borderTopColor: COLORS.GRAY[100],
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}>
        
        {/* Search Bar */}
        <View className="flex-row items-center rounded-lg p-3 mb-4 border"
          style={{ backgroundColor: COLORS.GRAY[50], borderColor: COLORS.GRAY[200] }}>
          <Text className="text-lg mr-3" style={{ color: COLORS.GRAY[400] }}>🔍</Text>
          <TextInput
            className="flex-1 text-base"
            placeholder="Search for workers or services..."
            placeholderTextColor={COLORS.GRAY[400]}
            style={{ color: COLORS.GRAY[700] }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Categories Slider */}
        <View className="mb-2">
          <Text className="text-lg font-bold mb-3" style={{ color: COLORS.GRAY[900] }}>
            Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16, paddingLeft: 2 }}
            style={{ marginHorizontal: -2 }}
          >
            {/* Category Items */}
            {WORKER_CATEGORIES.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                className="items-center p-3 rounded-2xl mr-3 border"
                style={{
                  backgroundColor: selectedCategory === item.id ? COLORS.PRIMARY + '20' : COLORS.GRAY[50],
                  borderColor: selectedCategory === item.id ? COLORS.PRIMARY : COLORS.GRAY[100],
                  minWidth: 75,
                }}
                onPress={() => handleCategoryPress(item.id)}
              >
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center mb-2"
                  style={{ backgroundColor: item.color + '20' }}
                >
                  <Text className="text-xl">{item.icon}</Text>
                </View>
                <Text className="text-xs font-medium text-center"
                  style={{ 
                    color: selectedCategory === item.id ? COLORS.PRIMARY : COLORS.GRAY[700]
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
            
            {/* Show More Button */}
            <TouchableOpacity
              className="items-center p-3 rounded-2xl border"
              style={{
                backgroundColor: COLORS.GRAY[50],
                borderColor: COLORS.GRAY[200],
                minWidth: 75,
              }}
              onPress={handleShowMoreCategories}
            >
              <View 
                className="w-12 h-12 rounded-2xl items-center justify-center mb-2"
                style={{ backgroundColor: COLORS.GRAY[100] }}
              >
                <Text className="text-xl">➕</Text>
              </View>
              <Text className="text-xs font-medium text-center"
                style={{ color: COLORS.GRAY[600] }}>
                Show More
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InstantFindScreen;