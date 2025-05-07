import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

interface EditNameModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (newName: string) => void;
  defaultValue?: string;
}

const EditNameModal: React.FC<EditNameModalProps> = ({
  visible,
  onCancel,
  onSave,
  defaultValue = "",
}) => {
  const [name, setName] = useState(defaultValue);

  useEffect(() => {
    setName(defaultValue);
  }, [defaultValue]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-5 rounded-lg w-[80%] shadow-md">
          <Text className="font-bold text-lg mb-2 text-dark_blue">
            Novo nome:
          </Text>

          <TextInput
            placeholder="Digite o novo nome"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />

          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onCancel}>
              <Text className="text-gray-700 mr-4">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onSave(name)}>
              <Text className="text-blue-600 font-bold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditNameModal;
