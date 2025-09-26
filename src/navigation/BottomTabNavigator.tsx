import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { HomeScreen, SearchScreen, JobsScreen, ProfileScreen } from '../screens';

type TabName = 'Home' | 'Search' | 'Jobs' | 'Profile';

const BottomTabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Search':
        return <SearchScreen />;
      case 'Jobs':
        return <JobsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const TabButton = ({ 
    name, 
    icon, 
    isActive 
  }: { 
    name: TabName; 
    icon: string; 
    isActive: boolean 
  }) => (
    <TouchableOpacity
      className={`flex-1 items-center py-2 ${isActive ? '' : ''}`}
      onPress={() => setActiveTab(name)}
    >
      <Text className={`text-2xl mb-1`}>{icon}</Text>
      <Text className={`text-xs font-medium ${
        isActive ? 'text-blue-600' : 'text-gray-500'
      }`}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      {/* Screen Content */}
      <View className="flex-1">
        {renderScreen()}
      </View>

      {/* Bottom Tab Bar */}
      <View className="bg-white border-t border-gray-200 px-2 py-2">
        <View className="flex-row">
          <TabButton
            name="Home"
            icon="🏠"
            isActive={activeTab === 'Home'}
          />
          <TabButton
            name="Search"
            icon="🔍"
            isActive={activeTab === 'Search'}
          />
          <TabButton
            name="Jobs"
            icon="📋"
            isActive={activeTab === 'Jobs'}
          />
          <TabButton
            name="Profile"
            icon="👤"
            isActive={activeTab === 'Profile'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BottomTabNavigator;