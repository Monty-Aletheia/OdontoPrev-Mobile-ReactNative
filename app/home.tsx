import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../components/footer'
import { Stack } from "expo-router";



const homeScreen = () => {
  return (
    <View className='w-[100%] h-[100%]'>
      <Text>homeScreen</Text>

      <View className="flex-1"></View>

      <View className='w-auto h-auto '>
        <Footer/>
      </View>
    </View>
  )
}

export default homeScreen

const styles = StyleSheet.create({})