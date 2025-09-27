import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS, WORKER_CATEGORIES } from '../utils/constants';
import { CategoryCard } from '../components';

// Simple demo sub-categories map; could be fetched later
const SUB_CATEGORIES: Record<string, { id: string; name: string; icon?: string; imageUri?: string }[]> = {
  cleaning: [
    { id: 'home-cleaning', name: 'Home Cleaning', icon: '🧽' },
    { id: 'office-cleaning', name: 'Office Cleaning', icon: '🏢' },
    { id: 'carpet', name: 'Carpet', icon: '🧼' },
    { id: 'window', name: 'Window', icon: '🪟' },
    { id: 'deep', name: 'Deep Clean', icon: '🧴' },
    { id: 'after-party', name: 'After Party', icon: '🎉' },
  ],
  plumbing: [
    { id: 'emergency', name: 'Emergency', icon: '🚰' },
    { id: 'installation', name: 'Installation', icon: '🔩' },
    { id: 'maintenance', name: 'Maintenance', icon: '🧰' },
    { id: 'water-tank', name: 'Water Tank', icon: '🛢️' },
  ],
  electrical: [
    { id: 'wiring', name: 'Wiring', icon: '🔌' },
    { id: 'lighting', name: 'Lighting', icon: '💡' },
    { id: 'inspection', name: 'Inspection', icon: '🧯' },
    { id: 'smart-home', name: 'Smart Home', icon: '🏠' },
  ],
  carpentry: [
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'cabinet', name: 'Cabinets', icon: '📦' },
    { id: 'repair', name: 'Repair', icon: '🧱' },
  ],
  painting: [
    { id: 'interior', name: 'Interior', icon: '🏠' },
    { id: 'exterior', name: 'Exterior', icon: '🏢' },
    { id: 'decor', name: 'Decorative', icon: '🖌️' },
  ],
  gardening: [
    { id: 'landscaping', name: 'Landscaping', icon: '🏞️' },
    { id: 'pruning', name: 'Pruning', icon: '✂️' },
    { id: 'design', name: 'Garden Design', icon: '🌿' },
  ],
  appliance: [
    { id: 'ac', name: 'AC Repair', icon: '❄️' },
    { id: 'fridge', name: 'Refrigerator', icon: '🧊' },
    { id: 'washer', name: 'Washer', icon: '🧺' },
  ],
  moving: [
    { id: 'house', name: 'House Move', icon: '🏠' },
    { id: 'office', name: 'Office Move', icon: '🏢' },
    { id: 'packing', name: 'Packing', icon: '📦' },
  ],
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [activeMainId, setActiveMainId] = useState<string>(WORKER_CATEGORIES[0]?.id ?? 'cleaning');

  const mainCategories = WORKER_CATEGORIES;
  const subCategories = useMemo(() => SUB_CATEGORIES[activeMainId] ?? [], [activeMainId]);

  const handleMainPress = (id: string) => setActiveMainId(id);
  const handleSubPress = (subId: string) => {
    // Navigate to search results filtered by the selected main category
    navigation.navigate('SearchResults', { category: activeMainId });
  };

  const renderMainItem = ({ item }: { item: typeof WORKER_CATEGORIES[0] }) => {
    const isActive = item.id === activeMainId;
    return (
      <TouchableOpacity
        className={`px-4 py-3 rounded-xl mb-2 flex-row items-center ${
          isActive ? 'bg-blue-50' : 'bg-white'
        }`}
        style={{ borderWidth: 1, borderColor: isActive ? COLORS.PRIMARY : COLORS.GRAY[200] }}
        onPress={() => handleMainPress(item.id)}
      >
        <View className="w-8 h-8 rounded-lg items-center justify-center mr-3"
          style={{ backgroundColor: item.color + '15' }}
        >
          <Text className="text-lg">{item.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold" style={{ color: COLORS.GRAY[900] }}>{item.name}</Text>
          <Text className="text-xs" style={{ color: COLORS.GRAY[500] }}>{item.workerCount} workers</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSubItem = ({ item }: { item: { id: string; name: string; icon?: string; imageUri?: string } }) => (
    <CategoryCard title={item.name} icon={item.icon} imageUri={item.imageUri} onPress={() => handleSubPress(item.id)} />
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.WHITE }}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-2xl" style={{ color: COLORS.GRAY[700] }}>←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>All Categories</Text>
          <View className="w-6" />
        </View>
      </View>

      {/* Body: Left sidebar + Right grid */}
      <View className="flex-1 flex-row">
        {/* Left: Main categories */}
        <View className="w-40 border-r border-gray-100 p-3">
          <FlatList
            data={mainCategories}
            renderItem={renderMainItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Right: Subcategories grid */}
        <View className="flex-1 p-3">
          <FlatList
            data={subCategories}
            renderItem={renderSubItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
