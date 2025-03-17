import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Details = () => {
  return (
    <View className='flex-1 mt-[20%] mr-5 ml-5'>
          
          <View className='flex-1  items-center'>
    
            <View className="h-auto w-auto ">
              <Image source={require("../assets/images/user_picture.png")} className="w-52 h-52 self-center" />
            </View>
    
    
            <View>
              <Text className='mt-14 color-dark_blue font-bold text-xl'>Pedro Lucca Medeiros Miranda</Text>
            </View>
    
            <View className='mt-14 bg-white w-[85%] mb-32 rounded-md shadow-lg flex-1 pr-6 pl-6 pt-10'>
                

                <View className='flex-row justify-between'>

                    <View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Data de nascimento:</Text>
                          <Text className='color-dark_blue'>11/08/2004</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Data da consulta:</Text>
                          <Text className='color-dark_blue '>22/02/12</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Frequencia:</Text>
                          <Text className='color-dark_blue '>1</Text>
                        </View>

                    </View>

                    <View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Genero:</Text>
                          <Text className='color-dark_blue'>M</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Valor da consulta:</Text>
                          <Text className='color-dark_blue '>R% 20.000</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Status de risco:</Text>
                          <Text className='color-dark_blue '>BAIXO</Text>
                        </View>

                    </View>

                </View>

                <View>
                    <Text className='color-dark_blue font-black mt-5'>Descrição</Text>
                    <Text className='color-dark_blue'>Descrição</Text>
                </View>

                
            </View>
    
          </View>
    
    
        </View>
  )
}

export default Details

const styles = StyleSheet.create({})