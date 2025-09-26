import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { WORKER_CATEGORIES, MOCK_WORKERS } from '../utils/constants';
import { Worker } from '../types/worker';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Worker[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Mock search results
      const results = MOCK_WORKERS.filter(worker =>
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
    }
  };

  const renderWorkerResult = ({ item }: { item: Worker }) => (
    <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row">
        <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
          <Text className="text-lg font-bold text-gray-500">{item.name.charAt(0)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
          <Text className="text-sm text-gray-600 capitalize">{item.category}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-yellow-500">⭐</Text>
            <Text className="text-sm text-gray-700 ml-1">{item.rating}</Text>
            <Text className="text-sm text-gray-500 ml-2">₹{item.hourlyRate}/hr</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Search Workers</Text>
        
        <View className="flex-row items-center bg-gray-100 rounded-lg p-3">
          <TextInput
            className="flex-1 text-base text-gray-900"
            placeholder="Search by service, skill, or name..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} className="ml-2">
            <Text className="text-blue-600 text-lg">🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Quick Categories */}
        <Text className="text-lg font-semibold text-gray-900 mb-3">Browse Categories</Text>
        <View className="flex-row flex-wrap mb-6">
          {WORKER_CATEGORIES.slice(0, 6).map((category) => (
            <TouchableOpacity
              key={category.id}
              className="bg-white rounded-lg p-3 m-1 items-center border border-gray-200"
              style={{ width: '30%' }}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text className="text-xl mb-1">{category.icon}</Text>
              <Text className="text-xs text-gray-700 text-center">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Search Results ({searchResults.length})
            </Text>
            <FlatList
              data={searchResults}
              renderItem={renderWorkerResult}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        )}

        {searchQuery && searchResults.length === 0 && !isSearching && (
          <View className="items-center py-8">
            <Text className="text-gray-500 text-center">No workers found for "{searchQuery}"</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;