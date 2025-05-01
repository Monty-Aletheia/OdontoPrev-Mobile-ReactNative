import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import api from '../service/api';
import { retryRequest } from '../utils/retry';
import { Consultation } from '../types/consultation';
import { formatDate, formatGender, formatName, formatPrice } from '../utils/format';
import SplashScreen from '../components/SplashScreen';

const Details = () => {

  const { id } = useLocalSearchParams();
  const [consultation, setConsultaion] = useState<Consultation>()
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)


  const getConsultationById = async () => {
    try {
      setLoading(true);
      const response = await retryRequest(() => api.get(`/consultations/${id}`), 3, 3000);
      setConsultaion(response.data);
    } catch (error) {
      console.error("Erro ao carregar consulta: ", error);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsultationById()
  }, [])


  if (isLoading || !consultation){
    return (
        <SplashScreen/>
    )
  }


  return (
    <View className='flex-1 mt-[20%] mr-5 ml-5'>
          
          <View className='flex-1  items-center'>
    
            <View className="h-auto w-auto ">
              <Image source={require("../assets/images/user_picture.png")} className="w-52 h-52 self-center" />
            </View>
    
    
            <View>
              <Text className='mt-14 color-dark_blue font-bold text-xl text-center'>{consultation.patient.name}</Text>
            </View>
    
            <View className='mt-14 bg-white w-[85%] mb-32 rounded-md shadow-lg flex-1 pr-6 pl-6 pt-10'>
                

                <View className='flex-row justify-between'>

                    <View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Data de nascimento:</Text>
                          <Text className='color-dark_blue'>{formatDate(consultation.patient.birthday)}</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Data da consulta:</Text>
                          <Text className='color-dark_blue '>{formatDate(consultation.consultationDate)}</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Frequencia:</Text>
                          <Text className='color-dark_blue '>{consultation.patient.consultationFrequency}</Text>
                        </View>

                    </View>

                    <View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Genero:</Text>
                          <Text className='color-dark_blue'>{formatGender(consultation.patient.gender)}</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Valor da consulta:</Text>
                          <Text className='color-dark_blue '>{formatPrice(consultation.consultationValue)}</Text>
                        </View>

                        <View className='mb-3'>
                          <Text className='color-dark_blue font-black'>Status de risco:</Text>
                          <Text className='color-dark_blue '>{consultation.riskStatus}</Text>
                        </View>

                    </View>

                </View>

                {consultation?.description?.trim() ? (
                    <View>
                      <Text className='color-dark_blue font-black mt-5'>Descrição</Text>
                      <Text className='color-dark_blue'>{consultation.description}</Text>
                    </View>
                  ) : null}

                
            </View>
    
          </View>
    
    
        </View>
  )
}

export default Details

const styles = StyleSheet.create({})