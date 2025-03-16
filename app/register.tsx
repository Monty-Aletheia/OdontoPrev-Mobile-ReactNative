import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useState } from 'react'

const registerScreen = () => {

  const [nome, setNome] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [cro, setCro] = useState("");
  const [senha, setSenha] = useState("");
  
  return (
    <View className='flex-1 w-[100%] h-[100%] bg-white'>
      <View className='flex-1 ml-10 mr-10' >
  
        <View className='mt-[10%]'>
          <Image source={require("../assets/images/AletheiaLogo.png")} className="w-21 h-21 self-center" />
        </View>
  
        <View className="flex-1 items-center bg-white p-6">
  
          <Text className='self-start ml-3 mb-2 color-dark_blue font-semibold'>Nome</Text>
          <TextInput
            className="w-full bg-gray-200 rounded-md p-3 mb-5"
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <Text className='self-start ml-3 mb-2 color-dark_blue font-semibold'>Especialidade</Text>
          <TextInput
            className="w-full bg-gray-200 rounded-md p-3 mb-5"
            placeholder="Especialidade"
            value={specialty}
            onChangeText={setSpecialty}
          />
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
  
  
          <TouchableOpacity className="w-full bg-dark_blue p-3 rounded-md mb-14" onPress={() => alert(cro + " " + nome + " " + specialty + " " + senha)}>
            <Text className="text-white text-center font-bold">Entrar</Text>
          </TouchableOpacity>
  
          <Link href="/" > 
            <Text className="text-blue-400 mt-4 text-sm underline font-semibold">Já possui uma conta Aletheia? Entre agora!</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default registerScreen

const styles = StyleSheet.create({})