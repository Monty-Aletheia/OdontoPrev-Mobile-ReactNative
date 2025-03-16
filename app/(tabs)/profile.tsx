import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'



const Home = () => {
  return (
    <View className='flex-1 mt-[20%] mr-5 ml-5'>
      
      <View className='flex-1  items-center'>

        <View className="h-auto w-auto ">
          <Image source={require("../../assets/images/user_picture.png")} className="w-52 h-52 self-center" />
        </View>


        <View>
          <Text className='mt-20 color-dark_blue font-bold text-xl'>Pedro Lucca Medeiros Miranda</Text>
        </View>

        <View className='mt-20 bg-white w-[85%] mb-32 rounded-md shadow-lg flex-1 flex-row justify-between pr-10 pl-10 pt-10'>
            
          <View>
            <Text className='color-dark_blue font-black'>Especialidade:</Text>
            <Text className='color-dark_blue'>Odontologia</Text>
          </View>

          <View>
            <Text className='color-dark_blue font-black'>Numero de CRO:</Text>
            <Text className='color-dark_blue '>380129</Text>
          </View>

        </View>

      </View>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({})