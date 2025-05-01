import { useRouter } from "expo-router";
import { Consultation } from "../types/consultation";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { formatDate, formatName, formatPrice } from "../utils/format";

type ListItemProps = {
  consultation: Consultation;
};

const ListItems: React.FC<ListItemProps> = ({ consultation }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/details",
      params: { id: consultation.id },
    });
  };

  return (
    <View className="flex-row justify-between bg-white rounded-md shadow-lg m-5 pt-3 pb-3">
      <View>
        <Image source={require("../assets/images/profile_list_icon.png")} className="w-20 h-20" />
      </View>

      <View className="ml-2 flex-1 justify-center">
        <Text className="text-lg font-bold color-dark_blue">{formatName(consultation.patient.name)}</Text>
        <Text className="text-lg color-dark_blue">{formatDate(consultation.consultationDate)}</Text>
        <Text className="text-lg color-dark_blue">{formatPrice(consultation.consultationValue)}</Text>
      </View>

      <TouchableOpacity onPress={handlePress}>
        <Image source={require("../assets/images/arrow_right.png")} className="w-14 h-14 mt-3 mr-3" />
      </TouchableOpacity>
    </View>
  );
};

export default ListItems;
