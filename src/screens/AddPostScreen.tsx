import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { createPost, clearPostError } from '../store/slices/postSlice';
import { LoadingSpinner } from '../components';
import { VALIDATION, MESSAGES } from '../utils/constants';
import { CreatePostRequest, PostFormData } from '../types/post';
import { RootStackParamList } from '../types/navigation';

type AddPostScreenNavigationProp = NavigationProp<RootStackParamList, 'AddPost'>;

const POST_CATEGORIES = [
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Entertainment',
  'Sports',
  'Business',
  'Education',
  'Other'
];

const AddPostScreen: React.FC = () => {
  const navigation = useNavigation<AddPostScreenNavigationProp>();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    imageUrl: '',
    tags: [],
    category: '',
    status: 'draft',
  });
  
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    category: '',
  });
  
  const [tagInput, setTagInput] = useState('');

  const dispatch = useAppDispatch();
  const { isSubmitting, error } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearPostError());
    }
  }, [error, dispatch]);

  const validateForm = (): boolean => {
    const newErrors = { title: '', content: '', category: '' };
    let isValid = true;

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = MESSAGES.VALIDATION.TITLE_REQUIRED;
      isValid = false;
    } else if (formData.title.length < VALIDATION.POST.TITLE_MIN_LENGTH) {
      newErrors.title = MESSAGES.VALIDATION.TITLE_MIN_LENGTH;
      isValid = false;
    } else if (formData.title.length > VALIDATION.POST.TITLE_MAX_LENGTH) {
      newErrors.title = MESSAGES.VALIDATION.TITLE_MAX_LENGTH;
      isValid = false;
    }

    // Content validation
    if (!formData.content.trim()) {
      newErrors.content = MESSAGES.VALIDATION.CONTENT_REQUIRED;
      isValid = false;
    } else if (formData.content.length < VALIDATION.POST.CONTENT_MIN_LENGTH) {
      newErrors.content = MESSAGES.VALIDATION.CONTENT_MIN_LENGTH;
      isValid = false;
    } else if (formData.content.length > VALIDATION.POST.CONTENT_MAX_LENGTH) {
      newErrors.content = MESSAGES.VALIDATION.CONTENT_MAX_LENGTH;
      isValid = false;
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = MESSAGES.VALIDATION.CATEGORY_REQUIRED;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validateForm()) {
      return;
    }

    const postData: CreatePostRequest = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      status,
      tags: formData.tags.length > 0 ? formData.tags : undefined,
      imageUrl: formData.imageUrl.trim() || undefined,
    };

    try {
      await dispatch(createPost(postData)).unwrap();
      Alert.alert(
        'Success', 
        `Post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      // Error handled by useEffect
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < VALIDATION.POST.MAX_TAGS) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const updateFormData = (field: keyof PostFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 py-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="text-blue-600 text-base font-medium">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Create Post</Text>
            <View className="w-12" />
          </View>

          {/* Title Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Title *
            </Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 text-base ${
                errors.title 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300 bg-white'
              }`}
              value={formData.title}
              onChangeText={(text) => updateFormData('title', text)}
              placeholder="Enter post title..."
              placeholderTextColor="#9CA3AF"
              maxLength={VALIDATION.POST.TITLE_MAX_LENGTH}
              editable={!isSubmitting}
            />
            {errors.title ? (
              <Text className="text-red-500 text-sm mt-1">{errors.title}</Text>
            ) : null}
            <Text className="text-gray-500 text-xs mt-1">
              {formData.title.length}/{VALIDATION.POST.TITLE_MAX_LENGTH}
            </Text>
          </View>

          {/* Category Selection */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Category *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-2">
                {POST_CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`px-4 py-2 rounded-full border ${
                      formData.category === category
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                    onPress={() => updateFormData('category', category)}
                    disabled={isSubmitting}
                  >
                    <Text className={`text-sm font-medium ${
                      formData.category === category ? 'text-white' : 'text-gray-700'
                    }`}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            {errors.category ? (
              <Text className="text-red-500 text-sm mt-1">{errors.category}</Text>
            ) : null}
          </View>

          {/* Content Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Content *
            </Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 text-base ${
                errors.content 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300 bg-white'
              }`}
              value={formData.content}
              onChangeText={(text) => updateFormData('content', text)}
              placeholder="Write your post content here..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              maxLength={VALIDATION.POST.CONTENT_MAX_LENGTH}
              editable={!isSubmitting}
            />
            {errors.content ? (
              <Text className="text-red-500 text-sm mt-1">{errors.content}</Text>
            ) : null}
            <Text className="text-gray-500 text-xs mt-1">
              {formData.content.length}/{VALIDATION.POST.CONTENT_MAX_LENGTH}
            </Text>
          </View>

          {/* Image URL Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Image URL (Optional)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              value={formData.imageUrl}
              onChangeText={(text) => updateFormData('imageUrl', text)}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor="#9CA3AF"
              keyboardType="url"
              editable={!isSubmitting}
            />
          </View>

          {/* Tags Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Tags (Optional)
            </Text>
            <View className="flex-row mb-2">
              <TextInput
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base bg-white mr-2"
                value={tagInput}
                onChangeText={setTagInput}
                placeholder="Add a tag..."
                placeholderTextColor="#9CA3AF"
                editable={!isSubmitting}
                onSubmitEditing={addTag}
              />
              <TouchableOpacity
                className="bg-blue-600 rounded-lg px-4 py-3 justify-center"
                onPress={addTag}
                disabled={!tagInput.trim() || formData.tags.length >= VALIDATION.POST.MAX_TAGS || isSubmitting}
              >
                <Text className="text-white font-medium">Add</Text>
              </TouchableOpacity>
            </View>
            {formData.tags.length > 0 && (
              <View className="flex-row flex-wrap">
                {formData.tags.map((tag, index) => (
                  <View key={index} className="bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2 flex-row items-center">
                    <Text className="text-gray-700 text-sm">{tag}</Text>
                    <TouchableOpacity
                      className="ml-2"
                      onPress={() => removeTag(tag)}
                      disabled={isSubmitting}
                    >
                      <Text className="text-gray-500 font-bold">×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            <Text className="text-gray-500 text-xs">
              {formData.tags.length}/{VALIDATION.POST.MAX_TAGS} tags
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3 mb-6">
            <TouchableOpacity
              className={`rounded-lg py-4 ${
                isSubmitting ? 'bg-blue-300' : 'bg-blue-600'
              }`}
              onPress={() => handleSubmit('published')}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner 
                  size="small" 
                  color="white" 
                  message="Publishing..." 
                  showBackground={false}
                />
              ) : (
                <Text className="text-white text-base font-semibold text-center">
                  Publish Post
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`border border-gray-300 rounded-lg py-4 ${
                isSubmitting ? 'bg-gray-100' : 'bg-white'
              }`}
              onPress={() => handleSubmit('draft')}
              disabled={isSubmitting}
            >
              <Text className="text-gray-700 text-base font-semibold text-center">
                Save as Draft
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPostScreen;