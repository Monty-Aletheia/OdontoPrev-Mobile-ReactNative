import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListItems from '../../components/Item'
import api from '../../service/api';
import { Consultation } from '../../types/consultation';
import { useAuth } from '../../components/AuthProvider';
import { retryRequest } from '../../utils/retry';

const List = () => {

  const { dentist } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const getConsultations = async () => {
    try {
      const response = await retryRequest(() => api.get("/consultations"), 3, 3000);
      const data = response.data;
  
      const filtered = data.filter((consultation: Consultation) =>
        consultation.dentists.some((d) => d.id === dentist?.id)
      );
      setConsultations(filtered);
    } catch (error) {
      console.error("Erro após múltiplas tentativas ao buscar consultas:", error);
    }
  };

  useEffect(()=>{
    getConsultations()
    
  }, [])


  return (
    <View className='mt-14'>
      <FlatList
      data={consultations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => 

        <ListItems consultation={item} />

      } 
      />
    </View>
  )
}

export default List

