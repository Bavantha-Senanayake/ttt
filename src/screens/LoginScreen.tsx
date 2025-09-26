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
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';
import { LoadingSpinner } from '../components';
import { VALIDATION, MESSAGES } from '../utils/constants';

const LoginScreen: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ mobile: '', password: '' });

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = { mobile: '', password: '' };
    let isValid = true;

    // Mobile validation
    if (!mobile.trim()) {
      newErrors.mobile = MESSAGES.VALIDATION.MOBILE_REQUIRED;
      isValid = false;
    } else if (!VALIDATION.MOBILE.PATTERN.test(mobile.trim())) {
      newErrors.mobile = MESSAGES.VALIDATION.MOBILE_INVALID;
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_REQUIRED;
      isValid = false;
    } else if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    console.log('result');
 

    try {
      await dispatch(loginUser({ mobile: mobile.trim(), password })).unwrap();
    } catch (error) {
      // Error is handled by useEffect
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-600 text-center">
              Sign in to your account
            </Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
            {/* Mobile Number Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </Text>
              <TextInput
                className={`border rounded-lg px-4 py-3 text-base ${
                  errors.mobile 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 bg-white'
                }`}
                value={mobile}
                onChangeText={(text) => {
                  setMobile(text);
                  if (errors.mobile) setErrors({ ...errors, mobile: '' });
                }}
                placeholder="Enter your mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={VALIDATION.MOBILE.MAX_LENGTH}
                editable={!isLoading}
              />
              {errors.mobile ? (
                <Text className="text-red-500 text-sm mt-1">{errors.mobile}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <TextInput
                className={`border rounded-lg px-4 py-3 text-base ${
                  errors.password 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 bg-white'
                }`}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                editable={!isLoading}
              />
              {errors.password ? (
                <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
              ) : null}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`rounded-lg py-4 ${
                isLoading 
                  ? 'bg-blue-300' 
                  : 'bg-blue-600'
              }`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner 
                  size="small" 
                  color="white" 
                  message="Signing In..." 
                  showBackground={false}
                />
              ) : (
                <Text className="text-white text-base font-semibold text-center">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-8">
            <Text className="text-gray-500 text-center text-sm">
              Don't have an account?{' '}
              <Text className="text-blue-600 font-medium">Sign Up</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;