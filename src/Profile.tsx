import { useDispatch } from "react-redux";
import { clearAuthState } from "./features/authSlice";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";

const Profile: React.FC = () => {

  const handleClick = () => {
    dispatch(clearAuthState());
  }

  const dispatch = useDispatch();
  return (
    <SafeAreaView className="bg-dark-navy flex-1">
      <View className="flex flex-1 justify-center items-center">
        <TouchableOpacity className="text-center px-3 py-2 rounded bg-darker-purple" onPress={handleClick}>
          <Text className="text-white text-xl">Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
