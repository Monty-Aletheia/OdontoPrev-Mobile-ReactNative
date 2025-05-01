import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from "../components/ControlledTextInput";
import { useAuth } from "../components/AuthProvider";



// Validação com zod
const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  specialty: z.string().min(1, "Especialidade é obrigatória"),
  registrationNumber: z.string().min(1, "CRO é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  claimsRate: z.coerce.number().min(0, "Índice de sinistro inválido"),
  riskStatus: z.coerce.number().int().min(0).max(2, "Status de risco inválido"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterScreen = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      specialty: "",
      registrationNumber: "",
      password: "",
      claimsRate: 1,
      riskStatus: 1,
    },
  });

  async function handleRegister(data: RegisterFormData) {
    const success = await signUp(data.name, data.specialty, data.registrationNumber, data.claimsRate, data.riskStatus, data.password)
    if (success) {
      router.replace("/");
    } else {
      console.log("Falha no cadastro");
    }
  }

  return (
    <View className="flex-1 w-[100%] h-[100%] bg-white">
      <View className="flex-1 ml-10 mr-10">
        <View className="mt-[10%]">
          <Image
            source={require("../assets/images/AletheiaLogo.png")}
            className="w-44 h-52 self-center"
          />
        </View>

        <View className="flex-1 items-center bg-white p-6">
          <Text className="self-start ml-3 mb-2 color-dark_blue font-semibold">
            Nome
          </Text>
          <ControlledTextInput
            control={control}
            name="name"
            placeholder="Nome"
            error={errors.name}
          />

          <Text className="self-start ml-3 mb-2 color-dark_blue font-semibold">
            Especialidade
          </Text>
          <ControlledTextInput
            control={control}
            name="specialty"
            placeholder="Especialidade"
            error={errors.specialty}
          />

          <Text className="self-start ml-3 mb-2 color-dark_blue font-semibold">
            Número de CRO
          </Text>
          <ControlledTextInput
            control={control}
            name="registrationNumber"
            placeholder="CRO"
            error={errors.registrationNumber}
          />

          <Text className="self-start ml-3 mb-2 color-dark_blue font-semibold">
            Senha
          </Text>
          <ControlledTextInput
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            error={errors.password}
          />

          {/* <Text className="self-start ml-3 mb-2 color-dark_blue font-semibold">
            Índice de Sinistros
          </Text>
          <ControlledTextInput
            control={control}
            name="claimsRate"
            placeholder="Ex: 2.5"
            keyboardType="numeric"
            error={errors.claimsRate}
          /> */}

          {/* <Text className="self-start ml-3 mb-2 color-dark_blue font-semibold">
            Status de Risco (0, 1 ou 2)
          </Text>
          <ControlledTextInput
            control={control}
            name="riskStatus"
            placeholder="Ex: 1"
            keyboardType="numeric"
            error={errors.riskStatus}
          /> */}

          <TouchableOpacity
            className="w-full bg-dark_blue p-3 rounded-md mb-14 mt-10"
            onPress={handleSubmit(handleRegister)}
          >
            <Text className="text-white text-center font-bold">Cadastrar</Text>
          </TouchableOpacity>

          <Link href="/">
            <Text className="text-blue-400 mt-4 text-sm underline font-semibold">
              Já possui uma conta Aletheia? Entre agora!
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
