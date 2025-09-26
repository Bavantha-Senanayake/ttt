import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

interface Job {
  id: string;
  title: string;
  category: string;
  status: 'posted' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  applicants: number;
  postedDate: string;
  workerName?: string;
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Kitchen Plumbing Repair',
    category: 'Plumbing',
    status: 'in_progress',
    budget: 150,
    applicants: 5,
    postedDate: '2 days ago',
    workerName: 'John Smith',
  },
  {
    id: '2',
    title: 'House Deep Cleaning',
    category: 'Cleaning',
    status: 'completed',
    budget: 80,
    applicants: 12,
    postedDate: '1 week ago',
    workerName: 'Sarah Johnson',
  },
  {
    id: '3',
    title: 'Electrical Wiring Installation',
    category: 'Electrical',
    status: 'posted',
    budget: 300,
    applicants: 3,
    postedDate: '1 day ago',
  },
];

const JobsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'posted':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Job['status']) => {
    switch (status) {
      case 'posted':
        return 'Posted';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">{item.title}</Text>
          <Text className="text-sm text-gray-600">{item.category}</Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
          <Text className="text-xs font-medium">{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-900">₹{item.budget}</Text>
        <Text className="text-sm text-gray-500">{item.applicants} applicants</Text>
      </View>

      {item.workerName && (
        <View className="bg-gray-50 rounded-lg p-3 mb-3">
          <Text className="text-sm text-gray-600">Assigned to:</Text>
          <Text className="text-sm font-medium text-gray-900">{item.workerName}</Text>
        </View>
      )}

      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-500">Posted {item.postedDate}</Text>
        <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg">
          <Text className="text-white text-sm font-medium">View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const activeJobs = MOCK_JOBS.filter(job => 
    job.status === 'posted' || job.status === 'in_progress'
  );
  const completedJobs = MOCK_JOBS.filter(job => 
    job.status === 'completed' || job.status === 'cancelled'
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">My Jobs</Text>
        
        {/* Tab Navigation */}
        <View className="flex-row bg-gray-100 rounded-lg p-1">
          <TouchableOpacity
            className={`flex-1 py-2 rounded-md ${activeTab === 'active' ? 'bg-white' : ''}`}
            onPress={() => setActiveTab('active')}
          >
            <Text className={`text-center font-medium ${
              activeTab === 'active' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              Active ({activeJobs.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 rounded-md ${activeTab === 'completed' ? 'bg-white' : ''}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text className={`text-center font-medium ${
              activeTab === 'completed' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              Completed ({completedJobs.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {activeTab === 'active' ? (
          <>
            {activeJobs.length > 0 ? (
              <FlatList
                data={activeJobs}
                renderItem={renderJobCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="items-center py-12">
                <Text className="text-6xl mb-4">📋</Text>
                <Text className="text-lg font-semibold text-gray-900 mb-2">No Active Jobs</Text>
                <Text className="text-gray-500 text-center mb-6">
                  Post a job to find workers for your needs
                </Text>
                <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg">
                  <Text className="text-white font-semibold">Post a Job</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <>
            {completedJobs.length > 0 ? (
              <FlatList
                data={completedJobs}
                renderItem={renderJobCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="items-center py-12">
                <Text className="text-6xl mb-4">✅</Text>
                <Text className="text-lg font-semibold text-gray-900 mb-2">No Completed Jobs</Text>
                <Text className="text-gray-500 text-center">
                  Your completed jobs will appear here
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Post Job Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="w-14 h-14 bg-blue-600 rounded-full items-center justify-center shadow-lg">
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen;