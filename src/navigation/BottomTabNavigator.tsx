import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { HomeScreen, SearchScreen, JobsScreen, ProfileScreen } from '../screens';
import { COLORS } from '../utils/constants';

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
      className="flex-1 items-center py-3"
      onPress={() => setActiveTab(name)}
    >
      <Text className="text-xl mb-1" style={{ color: isActive ? COLORS.PRIMARY : COLORS.GRAY[400] }}>
        {icon}
      </Text>
      <Text 
        className="text-xs font-medium"
        style={{ color: isActive ? COLORS.PRIMARY : COLORS.GRAY[500] }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.WHITE }}>
      {/* Screen Content */}
      <View className="flex-1">
        {renderScreen()}
      </View>

      {/* Bottom Tab Bar */}
      <View 
        className="border-t px-4 py-2"
        style={{ 
          backgroundColor: COLORS.WHITE, 
          borderTopColor: COLORS.GRAY[100],
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <View className="flex-row justify-between">
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