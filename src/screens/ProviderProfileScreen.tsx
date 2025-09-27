import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, WORKER_CATEGORIES, MOCK_WORKERS } from '../utils/constants';
import { Worker } from '../types/worker';

type RouteParams = { workerId: string };

const ProviderProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workerId } = (route.params || {}) as RouteParams;

  const worker = useMemo<Worker>(() => (MOCK_WORKERS.find((w: any) => w.id === workerId) as Worker) || (MOCK_WORKERS[0] as unknown as Worker), [workerId]);
  const categoryName = WORKER_CATEGORIES.find(c => c.id === worker.category)?.name || worker.category;

  const handleBook = () => {
    // Hook booking flow here
    console.log('Book worker', worker.id);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.WHITE }}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-2xl" style={{ color: COLORS.GRAY[700] }}>←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: COLORS.GRAY[900] }}>Provider</Text>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View className="items-center py-6 bg-blue-50">
          {worker.profileImage ? (
            <Image source={{ uri: worker.profileImage }} className="w-28 h-28 rounded-full" />
          ) : (
            <View className="w-28 h-28 rounded-full items-center justify-center bg-white"
              style={{ elevation: 2 }}
            >
              <Text className="text-4xl font-bold" style={{ color: COLORS.GRAY[600] }}>
                {worker.name.charAt(0)}
              </Text>
            </View>
          )}
          <Text className="mt-3 text-2xl font-bold" style={{ color: COLORS.GRAY[900] }}>{worker.name}</Text>
          <Text className="text-sm mt-1" style={{ color: COLORS.GRAY[600] }}>{categoryName}</Text>

          <View className="flex-row items-center mt-3">
            <View className="flex-row items-center mr-3">
              <Text className="text-yellow-500 mr-1">⭐</Text>
              <Text className="font-semibold" style={{ color: COLORS.GRAY[800] }}>{worker.rating}</Text>
              <Text className="ml-1" style={{ color: COLORS.GRAY[500] }}>({worker.reviewCount})</Text>
            </View>
            {worker.isVerified && (
              <View className="bg-blue-100 px-2 py-1 rounded-full flex-row items-center">
                <Text className="text-blue-600 text-xs mr-1">✓</Text>
                <Text className="text-blue-700 text-xs font-medium">Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Details */}
        <View className="px-6 py-6">
          {/* Quick stats */}
          <View className="flex-row items-stretch mb-6">
            {[{label: 'Rate', value: `$${worker.hourlyRate}/hr`}, {label: 'Jobs', value: `${worker.completedJobs}`}, {label: 'Response', value: worker.responseTime}].map((s, i) => (
              <View key={i} className="flex-1 bg-white rounded-2xl border border-gray-100 items-center py-3 mx-1"
                style={{ elevation: 2 }}
              >
                <Text className="text-base font-bold" style={{ color: COLORS.GRAY[900] }}>{s.value}</Text>
                <Text className="text-xs mt-1" style={{ color: COLORS.GRAY[500] }}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Location */}
          <View className="mb-6">
            <Text className="text-base font-semibold mb-2" style={{ color: COLORS.GRAY[900] }}>Location</Text>
            <Text className="text-sm" style={{ color: COLORS.GRAY[700] }}>
              {worker.detailedLocation.address || ''}{worker.detailedLocation.address ? ', ' : ''}{worker.detailedLocation.city}, {worker.detailedLocation.district}
            </Text>
          </View>

          {/* Skills */}
          <View className="mb-6">
            <Text className="text-base font-semibold mb-2" style={{ color: COLORS.GRAY[900] }}>Skills</Text>
            <View className="flex-row flex-wrap">
              {worker.skills.map((skill, idx) => (
                <View key={idx} className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-xs font-medium" style={{ color: COLORS.GRAY[700] }}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* About */}
          {worker.description && (
            <View className="mb-6">
              <Text className="text-base font-semibold mb-2" style={{ color: COLORS.GRAY[900] }}>About</Text>
              <Text className="text-sm leading-5" style={{ color: COLORS.GRAY[700] }}>{worker.description}</Text>
            </View>
          )}

          {/* Contact */}
          <View className="mb-6">
            <Text className="text-base font-semibold mb-2" style={{ color: COLORS.GRAY[900] }}>Contact</Text>
            {worker.phoneNumber && (
              <Text className="text-sm mb-1" style={{ color: COLORS.GRAY[700] }}>📞 {worker.phoneNumber}</Text>
            )}
            {worker.email && (
              <Text className="text-sm" style={{ color: COLORS.GRAY[700] }}>✉️ {worker.email}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View className="px-6 py-4 border-t border-gray-100 bg-white">
        <TouchableOpacity className={`py-4 rounded-xl ${worker.isAvailable ? '' : 'opacity-50'}`} style={{ backgroundColor: COLORS.PRIMARY }} disabled={!worker.isAvailable} onPress={handleBook}>
          <Text className="text-center font-semibold" style={{ color: COLORS.WHITE }}>
            {worker.isAvailable ? 'Book Now' : 'Currently Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProviderProfileScreen;
