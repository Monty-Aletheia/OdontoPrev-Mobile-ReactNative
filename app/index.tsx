import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, Redirect, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../components/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from "../components/ControlledTextInput";

const loginSchema = z.object({
  registrationNumber: z.string().min(1, "CRO é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const router = useRouter();
  const { signIn, isSignedIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      registrationNumber: "",
      password: "",
    },
  });

  if (isSignedIn) {
    return <Redirect href="/profile" />;
  }

  async function handleLogin(data: LoginFormData) {
    const success = await signIn(data.registrationNumber, data.password);
    if (success) {
      router.replace("/profile");
    } else {
      console.log("Falha no login");
    }
  }

  return (
    <View className="flex-1 w-[100%] h-[100%] bg-white">
      <View className="flex-1 ml-10 mr-10 bg-white">
        <View className="mt-[20%]">
          <Image
            source={require("../assets/images/AletheiaLogo.png")}
            className="w-44 h-52 self-center"
          />
        </View>

        <View className="flex-1 items-center bg-white p-6">
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

          <TouchableOpacity
            className="w-full bg-dark_blue p-3 rounded-md mb-20 mt-10"
            onPress={handleSubmit(handleLogin)}
          >
            <Text className="text-white text-center font-bold">Entrar</Text>
          </TouchableOpacity>

          <Link href="/register">
            <Text className="text-blue-400 mt-4 text-sm underline font-semibold">
              Não possui uma conta Aletheia? Cadastrar-se
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
