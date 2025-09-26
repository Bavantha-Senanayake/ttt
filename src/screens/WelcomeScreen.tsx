import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { logoutUser } from '../store/slices/authSlice';
import { fetchUserProfile, clearUserError } from '../store/slices/userSlice';
import { LoadingSpinner } from '../components';
import { RootStackParamList } from '../types/navigation';
import { MESSAGES } from '../utils/constants';

type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, isLoading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Fetch user profile when component mounts
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    // Handle user profile fetch errors
    if (error) {
      Alert.alert('Profile Error', error);
      dispatch(clearUserError());
    }
  }, [error, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-12">
            <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-6">
              <Text className="text-white text-2xl font-bold">
                {profile?.username?.charAt(0) || 
                 profile?.name?.charAt(0) || 
                 user?.name?.charAt(0) || 
                 user?.mobile?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Welcome{profile?.username ? `, ${profile.username}` : ''}!
            </Text>
            <Text className="text-gray-600 text-center text-lg">
              You have successfully logged in
            </Text>
            {isLoading && (
              <View className="mt-2">
                <LoadingSpinner 
                  size="small" 
                  color="#2563EB" 
                  message="Loading profile..." 
                  showBackground={false}
                />
              </View>
            )}
          </View>

          {/* User Info Card */}
          <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600 font-medium">Mobile Number:</Text>
                <Text className="text-gray-900 font-semibold">
                  {profile?.mobile || user?.mobile || 'N/A'}
                </Text>
              </View>
              
              {(profile?.username || profile?.name || user?.name) && (
                <View className="flex-row justify-between items-center py-2 border-t border-gray-100">
                  <Text className="text-gray-600 font-medium">
                    {profile?.username ? 'Username:' : 'Name:'}
                  </Text>
                  <Text className="text-gray-900 font-semibold">
                    {profile?.username || profile?.name || user?.name}
                  </Text>
                </View>
              )}
              
              {(profile?.email || user?.email) && (
                <View className="flex-row justify-between items-center py-2 border-t border-gray-100">
                  <Text className="text-gray-600 font-medium">Email:</Text>
                  <Text className="text-gray-900 font-semibold">
                    {profile?.email || user?.email}
                  </Text>
                </View>
              )}
              
              <View className="flex-row justify-between items-center py-2 border-t border-gray-100">
                <Text className="text-gray-600 font-medium">User ID:</Text>
                <Text className="text-gray-900 font-semibold">
                  {profile?.id || user?.id || 'N/A'}
                </Text>
              </View>

              {profile?.createdAt && (
                <View className="flex-row justify-between items-center py-2 border-t border-gray-100">
                  <Text className="text-gray-600 font-medium">Member Since:</Text>
                  <Text className="text-gray-900 font-semibold">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Success Message */}
          <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-sm font-bold">✓</Text>
              </View>
              <View className="flex-1">
                <Text className="text-green-800 font-semibold">Login Successful</Text>
                <Text className="text-green-700 text-sm">
                  You are now authenticated and can access the application.
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            <TouchableOpacity 
              className="bg-green-600 rounded-lg py-4 px-6"
              onPress={() => navigation.navigate('AddPost')}
            >
              <Text className="text-white text-center font-semibold text-base">
                Create New Post
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-blue-600 rounded-lg py-4 px-6"
              onPress={() => dispatch(fetchUserProfile())}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner 
                  size="small" 
                  color="white" 
                  message="Refreshing Profile..." 
                  showBackground={false}
                />
              ) : (
                <Text className="text-white text-center font-semibold text-base">
                  Refresh Profile
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-gray-100 border border-gray-300 rounded-lg py-4 px-6"
              onPress={handleLogout}
            >
              <Text className="text-gray-700 text-center font-semibold text-base">
                Logout
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-auto pt-8">
            <Text className="text-gray-500 text-center text-sm">
              Welcome to OnDemand App
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;