import { Controller, useController } from "react-hook-form";
import { View, Text, TextInput, Pressable, Platform,  } from "react-native";
import React, { useEffect, useState }from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker"; 
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs"
import { Picker } from '@react-native-picker/picker';
import api from "../service/api";
import { Patient } from "../types/patient";



type Props = {
  control: any;
  name: string;
  placeholder: string;
  error?: any;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "number-pad"
    | "numeric"
    | "phone-pad"
    | "url"
    | "decimal-pad"
    | "web-search"
    | "visible-password";
  mode?: "date" | "text" | "select";
  isNumber?: boolean

};


const ControlledTextInput = ({
  control,
  secureTextEntry,
  placeholder,
  keyboardType = "default",
  name,
  error,
  mode = "text",
  isNumber = false
}: Props) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const [showPicker, setShowPicker] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);


  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {
      type
    } = event;
  
    setShowPicker(false);
  
    if (type === "set" && selectedDate) {
      onChange(dayjs(selectedDate).toISOString());
      console.log(selectedDate)
      
    }
  };

  const getPatients = async () => {
    try {
      const response = await api.get("/patients")
      const data = response.data
      setPatients(data)
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  


  if (mode === "date") {
    return (
      <>
        <Pressable 
          onPress={() => setShowPicker(true)}
          className="w-full bg-gray-200 rounded-md p-3 mb-5"
        >
          <Text style={{color: value ? "#000" : "#68696b"}} className="ml-1">{value ? dayjs(value).format("DD/MM/YYYY") : placeholder}</Text>
        </Pressable>
        {showPicker && (
          <RNDateTimePicker
            mode="date"
            value={value ? new Date(value) : new Date()}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
        {error && <Text className="text-red-500 self-start mb-2 ml-2 text-xs">{error.message}</Text>}
      </>
    );
  } if (mode === "select") {

    useEffect(() => {
      getPatients();
    }, []);

    return (
      <>
        <View className="w-full bg-gray-200 rounded-md mb-5 p-0">
          <Picker
                style={{height: 46}}
                selectedValue={patientId}
                onValueChange={(itemValue) => {
                  onChange(itemValue)
                  setPatientId(itemValue) 
                  console.log(patientId);                  
                } }
              >
                
                <Picker.Item label="Selecione o Paciente" value="" enabled={false}  
                style={{ 
                  margin: 0, 
                  padding: 0,
                  fontSize: 13 , 
                  color: "#68696b",
                  }}/>

                {patients.map((p) => (
                  <Picker.Item key={p.id} label={p.name} value={p.id} 
                  style={{
                    fontSize: 13, 
                    color: "#000"}}/>
                ))}
          </Picker>
        </View>
        {error && <Text className="text-red-500 self-start mb-2 ml-2 text-xs">{error.message}</Text>}
      </>

    )
  }


  return (
    <>
      <TextInput className="w-full bg-gray-200 rounded-md p-3 mb-5"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(text) => {
              if (isNumber) {
                const numericValue = Number(text);
                onChange(numericValue);
                console.log(numericValue);
                
              } else {
                onChange(text);
                console.log(text);
                
              }
        }}
        value={value}
        
      />
      {error && <Text className="text-red-500 self-start mb-2 ml-2 text-xs">{error.message}</Text>}
    </>
  );
};

export default ControlledTextInput;





