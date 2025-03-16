import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

type ListItemProps = {
    name: string;
    date: string;
    price: string;
  };

const ListItems: React.FC<ListItemProps> = ({name , date, price}) => {
  return (
    <View className="flex-row justify-between bg-white rounded-md shadow-lg m-5 pt-3 pb-3">

      <View>
        <Image source={require("../assets/images/profile_list_icon.png")} className="w-20 h-20 "/>
      </View>

      <View className="flex-1 justify-center">
        <Text className="text-lg font-bold color-dark_blue">{name}</Text>
        <Text className="text-lg color-dark_blue">{date}</Text>
        <Text className="text-lg color-dark_blue">{price}</Text>
      </View>

    
      <View>
        <TouchableOpacity>
            <Image source={require("../assets/images/arrow_right.png")} className="w-14 h-14 mt-3 mr-3"/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ListItems;

