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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { WORKER_CATEGORIES, MOCK_WORKERS, COLORS, LOCATIONS } from '../utils/constants';
import { Worker } from '../types/worker';
import LoadingSpinner from '../components/LoadingSpinner';

interface RouteParams {
  searchQuery?: string;
  category?: string;
}

interface FilterState {
  province: string;
  district: string;
  city: string;
  category: string;
  minRating: number;
  maxRate: number;
  isAvailable: boolean;
  isVerified: boolean;
}

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SearchResultsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const { searchQuery: initialQuery = '', category: initialCategory = '' } = (route.params as RouteParams) || {};
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Worker[]>(MOCK_WORKERS);
  const [filteredResults, setFilteredResults] = useState<Worker[]>(MOCK_WORKERS);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');
  
  const [filters, setFilters] = useState<FilterState>({
    province: '',
    district: '',
    city: '',
    category: initialCategory,
    minRating: 0,
    maxRate: 1000,
    isAvailable: false,
    isVerified: false,
  });



  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  useEffect(() => {
    applyFilters();
  }, [filters, searchResults, sortBy]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const results = MOCK_WORKERS.filter(worker =>
          worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
          worker.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults(MOCK_WORKERS);
    }
  };

  const applyFilters = () => {
    let results = [...searchResults];

    // Apply location filters
    if (filters.province) {
      results = results.filter(worker => 
        worker.detailedLocation.province.toLowerCase().includes(filters.province.toLowerCase())
      );
    }
    if (filters.district) {
      results = results.filter(worker => 
        worker.detailedLocation.district.toLowerCase().includes(filters.district.toLowerCase())
      );
    }
    if (filters.city) {
      results = results.filter(worker => 
        worker.detailedLocation.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.category) {
      results = results.filter(worker => worker.category === filters.category);
    }
    if (filters.minRating > 0) {
      results = results.filter(worker => worker.rating >= filters.minRating);
    }
    if (filters.maxRate < 1000 && filters.maxRate !== 999) {
      results = results.filter(worker => worker.hourlyRate <= filters.maxRate);
    } else if (filters.maxRate === 999) {
      results = results.filter(worker => worker.hourlyRate >= 50);
    }
    if (filters.isAvailable) {
      results = results.filter(worker => worker.isAvailable);
    }
    if (filters.isVerified) {
      results = results.filter(worker => worker.isVerified);
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'distance':
          return (a.distance || 0) - (b.distance || 0);
        default:
          return 0;
      }
    });

    setFilteredResults(results);
  };

  const toggleFilters = () => {
    console.log('Toggle filters clicked, current showFilters:', showFilters);
    setShowFilters(!showFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.province) count++;
    if (filters.district) count++;
    if (filters.city) count++;
    if (filters.category) count++;
    if (filters.minRating > 0) count++;
    if (filters.maxRate < 1000) count++;
    if (filters.isAvailable) count++;
    if (filters.isVerified) count++;
    return count;
  };

  const clearFilters = () => {
    setFilters({
      province: '',
      district: '',
      city: '',
      category: '',
      minRating: 0,
      maxRate: 1000,
      isAvailable: false,
      isVerified: false,
    });
  };

  const getDistrictsForProvince = (provinceName: string) => {
    const province = LOCATIONS.PROVINCES.find(p => p.name === provinceName);
    if (!province) return [];
    return LOCATIONS.DISTRICTS.filter(d => d.parentId === province.id);
  };

  const getCitiesForDistrict = (districtName: string) => {
    const district = LOCATIONS.DISTRICTS.find(d => d.name === districtName);
    if (!district) return [];
    return LOCATIONS.CITIES.filter(c => c.parentId === district.id);
  };

  const handleWorkerPress = (worker: Worker) => {
    // Navigate to worker profile screen
  navigation.navigate('ProviderProfile', { workerId: worker.id });
  };

  const handleBookNow = (worker: Worker) => {
    console.log('Book worker:', worker.id);
    // Navigate to booking screen
  };

  const renderWorkerCard = ({ item }: { item: Worker }) => (
    <TouchableOpacity
      className="bg-white rounded-3xl mb-4 overflow-hidden border border-gray-100"
      onPress={() => handleWorkerPress(item)}
      style={{
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginHorizontal: 4,
      }}
    >
      {/* Header with Profile Image and Status */}
      <View className="relative">
        <View 
          className="h-36 items-center justify-center pt-4"
          style={{ backgroundColor: '#F0F9FF' }}
        >
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} className="w-24 h-24 rounded-full" />
          ) : (
            <View 
              className="w-24 h-24 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.WHITE, elevation: 2 }}
            >
              <Text className="text-3xl font-bold" style={{ color: COLORS.GRAY[600] }}>
                {item.name.charAt(0)}
              </Text>
            </View>
          )}
          
          {/* Status Badge */}
          <View 
            className={`absolute top-3 right-3 px-3 py-1 rounded-full flex-row items-center ${
              item.isAvailable ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <View 
              className={`w-2 h-2 rounded-full mr-1 ${
                item.isAvailable ? 'bg-green-500' : 'bg-gray-400'
              }`} 
            />
            <Text 
              className={`text-xs font-medium ${
                item.isAvailable ? 'text-green-700' : 'text-gray-600'
              }`}
            >
              {item.isAvailable ? 'Available' : 'Busy'}
            </Text>
          </View>

          {/* Rating Badge */}
          <View className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex-row items-center shadow-sm">
            <Text className="text-yellow-500 text-xs mr-1">⭐</Text>
            <Text className="text-xs font-semibold" style={{ color: COLORS.GRAY[800] }}>
              {item.rating}
            </Text>
            <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>
              ({item.reviewCount})
            </Text>
          </View>
        </View>

        {/* Verified Badge */}
        {item.isVerified && (
          <View className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <View className="bg-blue-100 px-2 py-1 rounded-full flex-row items-center">
              <Text className="text-blue-600 text-xs mr-1">✓</Text>
              <Text className="text-blue-700 text-xs font-medium">Verified</Text>
            </View>
          </View>
        )}
      </View>

      {/* Worker Details */}
      <View className="p-5">
        {/* Name and Category */}
        <View className="mb-3">
          <Text className="text-xl font-bold mb-1" style={{ color: COLORS.GRAY[900] }}>
            {item.name}
          </Text>
          <Text className="text-sm capitalize font-medium" style={{ color: COLORS.GRAY[600] }}>
            {WORKER_CATEGORIES.find(cat => cat.id === item.category)?.name || item.category}
          </Text>
        </View>

        {/* Location */}
        <View className="flex-row items-center mb-3">
          <Text className="text-gray-500 text-sm mr-1">📍</Text>
          <Text className="text-sm" style={{ color: COLORS.GRAY[600] }}>
            {item.detailedLocation.city}, {item.detailedLocation.district}
          </Text>
          {item.distance && (
            <Text className="text-sm ml-2" style={{ color: COLORS.GRAY[500] }}>
              • {item.distance} km away
            </Text>
          )}
        </View>

        {/* Skills */}
        <View className="mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {item.skills.slice(0, 3).map((skill, index) => (
                <View 
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full mr-2"
                >
                  <Text className="text-xs font-medium" style={{ color: COLORS.GRAY[700] }}>
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Stats Row */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="items-center mr-4">
              <Text className="text-lg font-bold" style={{ color: COLORS.PRIMARY }}>
                ${item.hourlyRate}
              </Text>
              <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>per hour</Text>
            </View>
            <View className="items-center mr-4">
              <Text className="text-sm font-semibold" style={{ color: COLORS.GRAY[800] }}>
                {item.completedJobs}
              </Text>
              <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>jobs done</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm font-semibold" style={{ color: COLORS.GRAY[800] }}>
                {item.responseTime}
              </Text>
              <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>response</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {item.description && (
          <Text 
            className="text-sm mb-4 leading-5" 
            style={{ color: COLORS.GRAY[600] }}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        )}

        {/* Action Buttons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity 
            className="flex-1 py-3 rounded-xl border"
            style={{ borderColor: COLORS.PRIMARY, backgroundColor: 'transparent' }}
            onPress={() => handleWorkerPress(item)}
          >
            <Text 
              className="text-center text-sm font-semibold" 
              style={{ color: COLORS.PRIMARY }}
            >
              View Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-xl ${item.isAvailable ? '' : 'opacity-50'}`}
            style={{ backgroundColor: COLORS.PRIMARY }}
            onPress={() => handleBookNow(item)}
            disabled={!item.isAvailable}
          >
            <Text 
              className="text-center text-sm font-semibold" 
              style={{ color: COLORS.WHITE }}
            >
              {item.isAvailable ? 'Book Now' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLocationPicker = () => (
    <View className="mb-4">
      <Text className="text-base font-semibold mb-3" style={{ color: COLORS.GRAY[900] }}>
        Location Filter
      </Text>
      
      {/* Province Selector */}
      <View className="mb-3">
        <Text className="text-sm font-medium mb-2" style={{ color: COLORS.GRAY[700] }}>Province</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg mr-2 border ${
                filters.province === '' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
              }`}
              onPress={() => setFilters(prev => ({ ...prev, province: '', district: '', city: '' }))}
            >
              <Text className={`text-sm ${filters.province === '' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                All Provinces
              </Text>
            </TouchableOpacity>
            {LOCATIONS.PROVINCES.map((province) => (
              <TouchableOpacity
                key={province.id}
                className={`px-4 py-2 rounded-lg mr-2 border ${
                  filters.province === province.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
                onPress={() => setFilters(prev => ({ 
                  ...prev, 
                  province: province.name,
                  district: '',
                  city: ''
                }))}
              >
                <Text className={`text-sm ${
                  filters.province === province.name ? 'text-blue-700 font-medium' : 'text-gray-700'
                }`}>
                  {province.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* District Selector */}
      {filters.province && (
        <View className="mb-3">
          <Text className="text-sm font-medium mb-2" style={{ color: COLORS.GRAY[700] }}>District</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg mr-2 border ${
                  filters.district === '' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
                onPress={() => setFilters(prev => ({ ...prev, district: '', city: '' }))}
              >
                <Text className={`text-sm ${filters.district === '' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                  All Districts
                </Text>
              </TouchableOpacity>
              {getDistrictsForProvince(filters.province).map((district) => (
                <TouchableOpacity
                  key={district.id}
                  className={`px-4 py-2 rounded-lg mr-2 border ${
                    filters.district === district.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                  }`}
                  onPress={() => setFilters(prev => ({ 
                    ...prev, 
                    district: district.name,
                    city: ''
                  }))}
                >
                  <Text className={`text-sm ${
                    filters.district === district.name ? 'text-blue-700 font-medium' : 'text-gray-700'
                  }`}>
                    {district.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* City Selector */}
      {filters.district && (
        <View className="mb-3">
          <Text className="text-sm font-medium mb-2" style={{ color: COLORS.GRAY[700] }}>City</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg mr-2 border ${
                  filters.city === '' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
                onPress={() => setFilters(prev => ({ ...prev, city: '' }))}
              >
                <Text className={`text-sm ${filters.city === '' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                  All Cities
                </Text>
              </TouchableOpacity>
              {getCitiesForDistrict(filters.district).map((city) => (
                <TouchableOpacity
                  key={city.id}
                  className={`px-4 py-2 rounded-lg mr-2 border ${
                    filters.city === city.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                  }`}
                  onPress={() => setFilters(prev => ({ ...prev, city: city.name }))}
                >
                  <Text className={`text-sm ${
                    filters.city === city.name ? 'text-blue-700 font-medium' : 'text-gray-700'
                  }`}>
                    {city.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.WHITE }}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-2xl" style={{ color: COLORS.GRAY[700] }}>←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>
            Search Results
          </Text>
          <View className="w-6" />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center rounded-xl p-3 border" 
          style={{ backgroundColor: COLORS.GRAY[50], borderColor: COLORS.GRAY[200] }}>
          <Text className="text-lg mr-3" style={{ color: COLORS.GRAY[400] }}>🔍</Text>
          <TextInput
            className="flex-1 text-base"
            placeholder="Search for services..."
            placeholderTextColor={COLORS.GRAY[400]}
            style={{ color: COLORS.GRAY[700] }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="text-lg" style={{ color: COLORS.GRAY[400] }}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters and Sort Header */}
      <View className="px-6 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium" style={{ color: COLORS.GRAY[900] }}>
            {filteredResults.length} workers found
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="flex-row items-center px-3 py-2 rounded-lg mr-2 border relative"
              style={{ borderColor: COLORS.GRAY[300] }}
              onPress={toggleFilters}
            >
              <Text className="text-sm mr-1" style={{ color: COLORS.GRAY[700] }}>🔧</Text>
              <Text className="text-sm font-medium" style={{ color: COLORS.GRAY[700] }}>
                Filters
              </Text>
              {getActiveFilterCount() > 0 && (
                <View className="absolute -top-2 -right-2 w-5 h-5 rounded-full items-center justify-center" 
                  style={{ backgroundColor: COLORS.PRIMARY }}>
                  <Text className="text-xs font-bold" style={{ color: COLORS.WHITE }}>
                    {getActiveFilterCount()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            
            <View className="relative">
              <TouchableOpacity
                className="flex-row items-center px-3 py-2 rounded-lg border"
                style={{ borderColor: COLORS.GRAY[300] }}
                onPress={() => setShowSortOptions(!showSortOptions)}
              >
                <Text className="text-sm mr-1" style={{ color: COLORS.GRAY[700] }}>↕</Text>
                <Text className="text-sm font-medium" style={{ color: COLORS.GRAY[700] }}>
                  Sort
                </Text>
              </TouchableOpacity>
              
              {showSortOptions && (
                <View className="absolute top-10 right-0 bg-white rounded-lg border border-gray-200 shadow-lg z-10" 
                  style={{ width: 150 }}>
                  {[
                    { key: 'rating', label: 'Highest Rated' },
                    { key: 'price', label: 'Lowest Price' },
                    { key: 'distance', label: 'Nearest First' }
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      className={`px-4 py-3 ${sortBy === option.key ? 'bg-blue-50' : ''}`}
                      onPress={() => {
                        setSortBy(option.key as 'rating' | 'price' | 'distance');
                        setShowSortOptions(false);
                      }}
                    >
                      <Text className={`text-sm ${
                        sortBy === option.key ? 'text-blue-700 font-medium' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Filter Panel */}
      {showFilters && (
        <View 
          className="bg-white px-6 py-4 border-b border-gray-200"
          style={{
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
        >
          {renderLocationPicker()}
          
          {/* Category Filter */}
          <View className="mb-4">
            <Text className="text-base font-semibold mb-3" style={{ color: COLORS.GRAY[900] }}>
              Service Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg mr-2 border ${
                    filters.category === '' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                  }`}
                  onPress={() => setFilters(prev => ({ ...prev, category: '' }))}
                >
                  <Text className={`text-sm ${filters.category === '' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                    All Categories
                  </Text>
                </TouchableOpacity>
                {WORKER_CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    className={`px-4 py-2 rounded-lg mr-2 border flex-row items-center ${
                      filters.category === category.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                    }`}
                    onPress={() => setFilters(prev => ({ ...prev, category: category.id }))}
                    style={{ minWidth: 100 }}
                  >
                    <Text className="text-sm mr-2">{category.icon}</Text>
                    <Text className={`text-sm ${
                      filters.category === category.id ? 'text-blue-700 font-medium' : 'text-gray-700'
                    }`}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          
          {/* Rating Filter */}
          <View className="mb-4">
            <Text className="text-base font-semibold mb-3" style={{ color: COLORS.GRAY[900] }}>
              Minimum Rating
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {[0, 4.0, 4.2, 4.5, 4.7, 4.8].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    className={`px-4 py-2 rounded-lg mr-2 border ${
                      filters.minRating === rating ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white'
                    }`}
                    onPress={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                  >
                    <Text className={`text-sm ${
                      filters.minRating === rating ? 'text-yellow-700 font-medium' : 'text-gray-700'
                    }`}>
                      {rating === 0 ? 'Any Rating' : `${rating}+ ⭐`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Price Range Filter */}
          <View className="mb-4">
            <Text className="text-base font-semibold mb-3" style={{ color: COLORS.GRAY[900] }}>
              Price Range (per hour)
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {[
                  { label: 'Any Price', max: 1000 },
                  { label: 'Under $25', max: 25 },
                  { label: 'Under $35', max: 35 },
                  { label: 'Under $50', max: 50 },
                  { label: '$50+', max: 999 }
                ].map((priceRange, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`px-4 py-2 rounded-lg mr-2 border ${
                      filters.maxRate === priceRange.max ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                    onPress={() => setFilters(prev => ({ ...prev, maxRate: priceRange.max }))}
                  >
                    <Text className={`text-sm ${
                      filters.maxRate === priceRange.max ? 'text-green-700 font-medium' : 'text-gray-700'
                    }`}>
                      {priceRange.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Quick Toggle Filters */}
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg border ${
                filters.isAvailable ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
              onPress={() => setFilters(prev => ({ ...prev, isAvailable: !prev.isAvailable }))}
            >
              <Text className={`text-sm ${
                filters.isAvailable ? 'text-green-700 font-medium' : 'text-gray-700'
              }`}>
                Available Now
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg border ${
                filters.isVerified ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onPress={() => setFilters(prev => ({ ...prev, isVerified: !prev.isVerified }))}
            >
              <Text className={`text-sm ${
                filters.isVerified ? 'text-blue-700 font-medium' : 'text-gray-700'
              }`}>
                Verified Only
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: COLORS.GRAY[100] }}
              onPress={clearFilters}
            >
              <Text className="text-sm font-medium" style={{ color: COLORS.GRAY[700] }}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Results List */}
      <View className="flex-1">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <LoadingSpinner />
            <Text className="text-base mt-4" style={{ color: COLORS.GRAY[600] }}>
              Searching for workers...
            </Text>
          </View>
        ) : filteredResults.length > 0 ? (
          <FlatList
            data={filteredResults}
            renderItem={renderWorkerCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-6xl mb-4">🔍</Text>
            <Text className="text-xl font-bold mb-2" style={{ color: COLORS.GRAY[900] }}>
              No workers found
            </Text>
            <Text className="text-base text-center" style={{ color: COLORS.GRAY[600] }}>
              Try adjusting your search terms or filters to find more results
            </Text>
            <TouchableOpacity
              className="mt-4 px-6 py-3 rounded-xl"
              style={{ backgroundColor: COLORS.PRIMARY }}
              onPress={clearFilters}
            >
              <Text className="text-white font-semibold">Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchResultsScreen;