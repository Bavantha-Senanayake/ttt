import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { checkStoredAuth } from '../store/slices/authSlice';
import { LoginScreen, AddPostScreen } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import { RootStackParamList } from '../types/navigation';
import { LoadingSpinner } from '../components';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check for stored authentication on app start
    dispatch(checkStoredAuth());
  }, [dispatch]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={BottomTabNavigator}
              options={{
                gestureEnabled: false, // Prevent going back to login after successful login
              }}
            />
            <Stack.Screen 
              name="AddPost" 
              component={AddPostScreen}
              options={{
                headerShown: true,
                title: 'Create Post',
                headerBackTitle: 'Back',
              }}
            />
          </>
        ) : (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;