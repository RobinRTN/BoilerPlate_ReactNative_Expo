import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Home from "./Home";
import Login from "./Login";


const InnerApp: React.FC = () => {

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <View className="flex-1 bg-dark-navy">
      <StatusBar style="light" />
      { accessToken ? (<Home/>) : (<Login/>)}
    </View>
  );
}

export default InnerApp;
