import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface CategoryCardProps {
  title: string;
  imageUri?: string;
  icon?: string; // fallback emoji/icon
  onPress?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUri, icon, onPress }) => {
  return (
    <TouchableOpacity
      className="m-2 flex-1"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="rounded-2xl overflow-hidden bg-white border border-gray-100"
        style={{ aspectRatio: 1, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 }}
      >
        <View className="flex-1 items-center justify-center">
          {imageUri ? (
            <Image
              source={{ uri: imageUri } as ImageSourcePropType}
              className="w-16 h-16 rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <View className="w-16 h-16 rounded-xl items-center justify-center bg-gray-50">
              <Text className="text-3xl">{icon || '📦'}</Text>
            </View>
          )}
        </View>
        <View className="px-3 py-2 border-t border-gray-100">
          <Text className="text-center text-sm font-medium text-gray-800" numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
