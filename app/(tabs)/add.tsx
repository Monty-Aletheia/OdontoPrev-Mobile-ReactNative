import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from "../../components/ControlledTextInput";
import { useRouter } from "expo-router";
import { useAuth } from "../../components/AuthProvider";
import { createConsultation } from "../../service/consultationService";

const schema = z.object({
  patientId: z.string().min(1, "Informe o paciente"),
  consultationDate: z.string().min(1, "Informe a data"),
  consultationValue: z.number().min(1, "Informe o valor"),
  dentistIds: z.array(z.string()).min(1),
  riskStatus: z.string().min(1),
  description: z.string().min(0),
});

type FormData = z.infer<typeof schema>;

const Add = () => {
  const { dentist } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: "",
      consultationDate: "",
      consultationValue: 0,
      riskStatus: "Low",
      description: "",
      dentistIds: [dentist?.id],
    },
  });

  async function handleCreateConsultation(data: FormData) {
    const sucess = await createConsultation(
      data.patientId,
      data.consultationDate,
      data.consultationValue,
      data.description,
      data.dentistIds,
      data.riskStatus
    );
    if (sucess) {
      router.replace("/list");
    } else {
      console.log("Erro ao criar a consulta");
    }
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 mt-[10%] mr-5 ml-5 bg-white items-center">
        <View className="flex-row justify-center items-center mb-14">
          <Image
            source={require("../../assets/images/AletheiaLogo.png")}
            className="w-20 h-24"
          />
          <Text className="font-black text-xl color-dark_blue ml-5">
            Nova Consulta
          </Text>
        </View>

        <View className="w-[80%]">
          <Text className="text-lg color-dark_blue ml-3 mb-2">Paciente</Text>
          <ControlledTextInput
            control={control}
            name="patientId"
            placeholder="Paciente"
            mode="select"
            error={errors.patientId}
          />
        </View>

        <View className="w-[80%]">
          <Text className="text-lg color-dark_blue ml-3 mb-2">
            Data da consulta
          </Text>
          <ControlledTextInput
            control={control}
            name="consultationDate"
            placeholder="Selecione a Data da Consulta"
            mode="date"
            error={errors.consultationDate}
          />
        </View>

        <View className="w-[80%]">
          <Text className="text-lg color-dark_blue ml-3 mb-2">
            Valor da consulta (R$)
          </Text>
          <ControlledTextInput
            control={control}
            name="consultationValue"
            placeholder="Valor da consulta"
            keyboardType="numeric"
            isNumber
            error={errors.consultationValue}
          />
        </View>

        <View className="w-[80%] mb-14">
          <Text className="text-lg color-dark_blue ml-3 mb-2">
            Descrição (Opcional)
          </Text>
          <ControlledTextInput
            control={control}
            name="description"
            placeholder="Descriçao"
            error={errors.description}
          />
        </View>

        <TouchableOpacity
          className="w-[80%] bg-dark_blue p-3 rounded-md"
          onPress={handleSubmit(handleCreateConsultation)}
        >
          <Text className="text-white text-center font-bold">Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Add;
