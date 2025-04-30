import { Controller, useController } from "react-hook-form";
import { View, Text, TextInput } from "react-native";

type Props = {
  control: any;
  name: string;
  placeholder: string;
  error?: any;
  secureTextEntry?: boolean;
  keyboardType:
    | "default"
    | "email-address"
    | "number-pad"
    | "numeric"
    | "phone-pad"
    | "url"
    | "decimal-pad"
    | "web-search"
    | "visible-password";
};

const ControlledTextInput = ({
  control,
  secureTextEntry,
  placeholder,
  keyboardType,
  name,
  error,
}: Props) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });
  return (
    <>
      <TextInput className="w-full bg-gray-200 rounded-md p-3 mb-5"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(text) => {
          onChange(text);
        }}
        value={value}
        
      />
      {error && <Text className="text-red-500 self-start mb-2 ml-2 text-xs">{error.message}</Text>}
    </>
  );
};

export default ControlledTextInput;
