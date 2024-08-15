import InnerApp from './src/InnerApp'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store'
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <InnerApp />
      </PersistGate>
    </Provider>
  );
}
