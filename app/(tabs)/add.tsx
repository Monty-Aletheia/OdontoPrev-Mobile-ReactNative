import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Add = () => {
  return (
    <View className='flex-1 bg-white'>
    <View className='flex-1 mt-[10%] mr-5 ml-5 bg-white items-center'>
      
      <View className='flex-row justify-center items-center mb-14'>
        <Image source={require("../../assets/images/AletheiaLogo.png")} className="w-20 h-24" />
        <Text className='font-black text-xl color-dark_blue ml-5'>Nova Consulta</Text>
      </View>

        
        <View className='w-[80%]'>
          <Text className='text-lg color-dark_blue ml-3 mb-2'>Paciente</Text>
          <TextInput className="w-full bg-gray-200 rounded-md p-3 mb-5"></TextInput>
        </View>

        <View className='w-[80%]'>
          <Text className='text-lg color-dark_blue ml-3  mb-2'>Data da consulta</Text>
          <TextInput placeholder="DD-MM-YYYY" className="w-full bg-gray-200 rounded-md p-3 mb-5" ></TextInput>
        </View>

        <View className='w-[80%]'>
          <Text className='text-lg color-dark_blue ml-3 mb-2'>Valor da consulta (R$)</Text>
          <TextInput className="w-full bg-gray-200 rounded-md p-3 mb-5" ></TextInput>
        </View>
         

        <View className='w-[80%] mb-14'>
          <Text className='text-lg color-dark_blue ml-3 mb-2'>Descrição (Opcional)</Text>
          <TextInput className="w-full bg-gray-200 rounded-md p-3 mb-5" ></TextInput>
        </View>

        <TouchableOpacity className="w-[80%] bg-dark_blue p-3 rounded-md" onPress={() => alert(cro + " " + nome + " " + specialty + " " + senha)}>
          <Text className="text-white text-center font-bold">Adicionar</Text>
        </TouchableOpacity>

      </View>
      </View>


  )
}

export default Add

const styles = StyleSheet.create({})