import InnerApp from './src/InnerApp'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store'
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),  // Path to your font file
    'Open Sans': require('./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),  // Path to your font file
  });

  if (!fontsLoaded) {
    return null; // You can return a loading component here if you want
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <InnerApp />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
