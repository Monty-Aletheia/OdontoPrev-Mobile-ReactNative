import {View, FlatList } from "react-native";
import React, { useState } from "react";
import ListItems from "../../components/Item";
import { Consultation } from "../../types/consultation";
import { useAuth } from "../../components/AuthProvider";
import { useFocusEffect } from "expo-router";
import { getConsultations } from "../../service/consultationService";

const List = () => {
  const [counter, setCounter] = useState(0);
  const { dentist } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const loadConsultations = async () => {
    try {
      const filtered = await getConsultations(dentist?.id);
      setConsultations(filtered);
    } catch (error) {
      console.error(
        "Erro após múltiplas tentativas ao buscar consultas:",
        error
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadConsultations();
    }, [])
  );

  return (
    <View className="mt-14">
      <FlatList
        data={consultations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItems consultation={item} />}
      />
    </View>
  );
};

export default List;
