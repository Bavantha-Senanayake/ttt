import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { logoutUser } from '../store/slices/authSlice';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => dispatch(logoutUser()) },
      ]
    );
  };

  const menuItems = [
    { id: '1', title: 'Edit Profile', icon: '👤', action: () => console.log('Edit Profile') },
    { id: '2', title: 'Payment Methods', icon: '💳', action: () => console.log('Payment') },
    { id: '3', title: 'Job History', icon: '📋', action: () => console.log('Job History') },
    { id: '4', title: 'Notifications', icon: '🔔', action: () => console.log('Notifications') },
    { id: '5', title: 'Help & Support', icon: '❓', action: () => console.log('Help') },
    { id: '6', title: 'Terms & Conditions', icon: '📄', action: () => console.log('Terms') },
    { id: '7', title: 'Privacy Policy', icon: '🔒', action: () => console.log('Privacy') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-200">
          <View className="items-center">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {user?.name?.charAt(0) || user?.mobile?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">
              {user?.name || 'User'}
            </Text>
            <Text className="text-gray-600">{user?.mobile}</Text>
            {user?.email && (
              <Text className="text-gray-600">{user.email}</Text>
            )}
          </View>
        </View>

        {/* Stats */}
        <View className="bg-white mx-6 mt-4 rounded-lg border border-gray-200">
          <View className="flex-row">
            <View className="flex-1 items-center py-4 border-r border-gray-200">
              <Text className="text-2xl font-bold text-blue-600">12</Text>
              <Text className="text-sm text-gray-600">Jobs Posted</Text>
            </View>
            <View className="flex-1 items-center py-4 border-r border-gray-200">
              <Text className="text-2xl font-bold text-green-600">8</Text>
              <Text className="text-sm text-gray-600">Completed</Text>
            </View>
            <View className="flex-1 items-center py-4">
              <Text className="text-2xl font-bold text-yellow-600">4.8</Text>
              <Text className="text-sm text-gray-600">Rating</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-6 mt-4 rounded-lg border border-gray-200">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-4 py-4 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onPress={item.action}
            >
              <Text className="text-xl mr-4">{item.icon}</Text>
              <Text className="flex-1 text-base text-gray-900">{item.title}</Text>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View className="bg-white mx-6 mt-4 rounded-lg border border-gray-200">
          <View className="px-4 py-4 border-b border-gray-100">
            <Text className="text-base text-gray-900">App Version</Text>
            <Text className="text-sm text-gray-600">1.0.0</Text>
          </View>
          <TouchableOpacity className="px-4 py-4">
            <Text className="text-base text-gray-900">Rate App</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="px-6 py-6">
          <TouchableOpacity
            className="bg-red-600 rounded-lg py-4"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-semibold text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;