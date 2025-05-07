import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { Redirect } from "expo-router";
import EditNameModal from "../../components/EditNameModal";

const Home = () => {
  const { getDentistById, isSignedIn, dentist, signOut, updateDentist } =
    useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      getDentistById();
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 mt-[5%] mr-5 ml-5">
      <View className="mt-5 flex-row w-[100%] justify-between mb-5">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View className="items-center">
            <Image
              source={require("../../assets/images/edit_icon.png")}
              className="w-9 h-9"
            />
            <Text className="color-dark_blue font-bold">Editar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Tem certeza?",
              "Você realmente deseja sair da sua conta?",
              [
                { text: "Nao", style: "cancel" },
                { text: "Sim", style: "default", onPress: signOut },
              ]
            );
          }}
        >
          <View className="items-center">
            <Image
              source={require("../../assets/images/logout_icon.png")}
              className="w-9 h-9"
            />
            <Text className="color-red-500 font-bold">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/images/user_picture.png")}
          className="w-52 h-52 self-center"
        />

        <View>
          {dentist ? (
            <Text className="mt-10 color-dark_blue font-bold text-xl text-center ml-5 mr-5">
              {dentist?.name}
            </Text>
          ) : (
            <Text className="mt-20 color-dark_blue font-bold text-xl">
              Carregando informações...
            </Text>
          )}
        </View>

        <View className="mt-20 bg-white w-[85%] mb-32 rounded-md shadow-lg flex-1 flex-row justify-between pr-10 pl-10 pt-10">
          <View>
            <Text className="color-dark_blue font-black">Especialidade:</Text>
            <Text className="color-dark_blue">{dentist?.specialty}</Text>
          </View>

          <View>
            <Text className="color-dark_blue font-black">Numero de CRO:</Text>
            <Text className="color-dark_blue ">
              {dentist?.registrationNumber}
            </Text>
          </View>
        </View>
      </View>

      <EditNameModal
        visible={modalVisible}
        defaultValue={dentist?.name}
        onCancel={() => setModalVisible(false)}
        onSave={async (name: string) => {
          await updateDentist(name);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default Home;
