import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Consultation } from "../types/consultation";
import {
  formatDate,
  formatGender,
  formatPrice,
} from "../utils/format";
import SplashScreen from "../components/SplashScreen";
import {
  deleteConsultationById,
  getConsultationById,
} from "../service/consultationService";

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [consultation, setConsultaion] = useState<Consultation>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const handleLoad = async () => {
    try {
      setLoading(true);
      const data = await getConsultationById(id);
      setConsultaion(data);
    } catch (error) {
      setError(true);
      console.error("Erro ao carregar consulta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConsultationById(id);
      router.replace("/profile");
    } catch (error) {
      console.error("Erro ao deletar consulta:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (isLoading || !consultation) {
    return <SplashScreen />;
  }

  return (
    <View className="flex-1 mr-5 ml-5">
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Tem certeza?",
            "Você realmente deseja deletar esta consulta?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Deletar", style: "destructive", onPress: handleDelete },
            ]
          );
        }}
      >
        <View>
          <Image
            source={require("../assets/images/delete_icon.png")}
            className="w-11 h-11 self-end mt-5 mb-5"
          />
        </View>
      </TouchableOpacity>

      <View className="flex-1  items-center">
        <View className="h-auto w-auto ">
          <Image
            source={require("../assets/images/user_picture.png")}
            className="w-52 h-52 self-center"
          />
        </View>

        <View>
          <Text className="mt-14 color-dark_blue font-bold text-xl text-center">
            {consultation.patient.name}
          </Text>
        </View>

        <View className="h-auto mt-14 bg-white w-[85%] mb-32 rounded-md shadow-lg flex-1 pr-6 pl-6 pt-10">
          <View className="flex-row justify-between ">
            <View>
              <View className="mb-3">
                <Text className="color-dark_blue font-black">
                  Data de nascimento:
                </Text>
                <Text className="color-dark_blue">
                  {formatDate(consultation.patient.birthday)}
                </Text>
              </View>

              <View className="mb-3">
                <Text className="color-dark_blue font-black">
                  Data da consulta:
                </Text>
                <Text className="color-dark_blue ">
                  {formatDate(consultation.consultationDate)}
                </Text>
              </View>

              <View className="mb-3">
                <Text className="color-dark_blue font-black">Frequencia:</Text>
                <Text className="color-dark_blue ">
                  {consultation.patient.consultationFrequency}
                </Text>
              </View>
            </View>

            <View>
              <View className="mb-3">
                <Text className="color-dark_blue font-black">Genero:</Text>
                <Text className="color-dark_blue">
                  {formatGender(consultation.patient.gender)}
                </Text>
              </View>

              <View className="mb-3">
                <Text className="color-dark_blue font-black">
                  Valor da consulta:
                </Text>
                <Text className="color-dark_blue ">
                  {formatPrice(consultation.consultationValue)}
                </Text>
              </View>

              <View className="mb-3">
                <Text className="color-dark_blue font-black">
                  Status de risco:
                </Text>
                <Text className="color-dark_blue ">
                  {consultation.riskStatus}
                </Text>
              </View>
            </View>
          </View>

          {consultation?.description?.trim() ? (
            <View>
              <Text className="color-dark_blue font-black mt-5">Descrição</Text>
              <Text className="color-dark_blue">
                {consultation.description}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Details;
