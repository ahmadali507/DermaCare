import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/navigation/MainNavigator';
import { useFormStore } from './src/store/useFormStore';
import { useAuthStore } from './src/store/useAuthStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const loadFromStorage = useFormStore((state) => state.loadFromStorage);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Load persisted data on app start
    loadFromStorage();
    checkAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainNavigator />
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
