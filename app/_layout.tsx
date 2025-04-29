import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import '../global';
import { Stack } from 'expo-router';
import AuthProvider from '../components/AuthProvider';

const AppLayout = () => {
  return (
    <>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ headerTitle: "" }} />
        </Stack>
      </AuthProvider>
    </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})