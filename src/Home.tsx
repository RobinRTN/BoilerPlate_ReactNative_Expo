import { SafeAreaView, SafeAreaViewBase } from "react-native";
import AppNavigator from "./AppNavigator";


const Home: React.FC = () => {
  return (
    <SafeAreaView className="flex-1">
      <AppNavigator/>
    </SafeAreaView>
  );
}

export default Home;
