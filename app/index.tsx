import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from "react";
import { Link } from 'expo-router';


const LoginScreen = () => {

  const [cro, setCro] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View className='flex-1 w-[100%] h-[100%] bg-white'>
      <View className='flex-1 ml-10 mr-10 bg-white' >

        <View className='mt-[20%]'>
          <Image source={require("../assets/images/AletheiaLogo.png")} className="w-21 h-21 self-center" />
        </View>

        <View className="flex-1 items-center bg-white p-6">

          <Text className='self-start ml-3 mb-2 color-dark_blue font-semibold'>Numero de CRO</Text>
          <TextInput
            className="w-full bg-gray-200 rounded-md p-3 mb-5"
            placeholder="CRO"
            value={cro}
            onChangeText={setCro}
          />

          <Text className='self-start ml-3 mb-2 color-dark_blue font-semibold'>Senha</Text>
          <TextInput
            className="w-full bg-gray-200 rounded-md p-3 mb-14"
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Link href="/profile" asChild>
          <TouchableOpacity className="w-full bg-dark_blue p-3 rounded-md mb-20" onPress={() => alert("Login")}>

              <Text className="text-white text-center font-bold">Entrar</Text>

          </TouchableOpacity>
          </Link>

          <Link href="/register" > 
            <Text className="text-blue-400 mt-4 text-sm underline font-semibold">Não possui uma conta Aletheia? Cadastrar-se</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})