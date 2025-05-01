import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../../components/AuthProvider';
import { Redirect } from 'expo-router';



const Home = () => {
  const { getDentistById, isSignedIn, dentist, signOut } = useAuth();

  if (!isSignedIn){
    return <Redirect href="/"/>
  }

  useEffect(() => {
    if (isSignedIn) {
      getDentistById();
    }
  }, [isSignedIn]);

  return (
    <View className='flex-1 mt-[20%] mr-5 ml-5'>
      
      <View className='flex-1  items-center'>

        <Pressable onPress={signOut}>

            <Image source={require("../../assets/images/user_picture.png")} className="w-52 h-52 self-center" />

        </Pressable>


        <View>
          {dentist ? (<Text className='mt-20 color-dark_blue font-bold text-xl'>{dentist?.name}</Text>
        ) : <Text className='mt-20 color-dark_blue font-bold text-xl'>Carregando informações...</Text>}
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