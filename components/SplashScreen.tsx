import { View, ActivityIndicator } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#6B91A9" />
    </View>
  );
};

export default SplashScreen;
