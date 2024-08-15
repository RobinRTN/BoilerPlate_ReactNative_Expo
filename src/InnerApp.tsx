import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Home from "./Home";
import Login from "./Login";
import Sign from "./Sign"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const InnerApp: React.FC = () => {

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (

    <View className="flex-1 bg-dark-navy">
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerLeft: () => null,
          }}
        >
        { accessToken ?
         (<Stack.Screen name="Home" component={Home}/>) :
         (<Stack.Screen name="Sign" component={Sign}/>)}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default InnerApp;
