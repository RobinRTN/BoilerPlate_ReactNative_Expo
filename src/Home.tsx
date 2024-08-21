import { SafeAreaView, SafeAreaViewBase, View } from "react-native";
import AppNavigator from "./AppNavigator";


const Home: React.FC = () => {
  return (
    <SafeAreaView className="flex-1  bg-dark-navy">
      <AppNavigator/>
    </SafeAreaView>
  );
}

export default Home;
