import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import '../global';
import { Stack } from 'expo-router';

const AppLayout = () => {
  return (
    <>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    </>
  )
}

export default AppLayout

const styles = StyleSheet.create({})