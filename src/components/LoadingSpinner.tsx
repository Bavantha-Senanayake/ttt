import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  showBackground?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#3B82F6',
  message = 'Loading...',
  showBackground = true,
}) => {
  if (!showBackground) {
    return (
      <View className="flex-row items-center justify-center">
        <ActivityIndicator size={size} color={color} />
        {message && (
          <Text className="ml-2 text-sm" style={{ color }}>
            {message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="mt-4 text-base text-gray-600">
          {message}
        </Text>
      )}
    </View>
  );
};

export default LoadingSpinner;