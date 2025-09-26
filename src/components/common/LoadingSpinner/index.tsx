import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  className?: string;
  showBackground?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  color = '#2563EB', 
  message = '', 
  className = '',
  showBackground = true 
}) => {
  if (showBackground) {
    return (
      <View className={`flex-1 justify-center items-center bg-white ${className}`}>
        <ActivityIndicator size={size} color={color} />
        {message ? (
          <Text className="text-gray-600 mt-3 text-base">{message}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View className={`flex-row items-center justify-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
      {message ? (
        <Text className="text-gray-600 ml-2 text-base">{message}</Text>
      ) : null}
    </View>
  );
};

export default LoadingSpinner;