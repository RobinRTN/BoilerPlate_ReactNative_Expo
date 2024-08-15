import React from 'react';
import Login from './Login'; // Adjust path as necessary
import SignUp from './SignUp'; // Adjust path as necessary
import { useState } from 'react';
import { View } from 'react-native';

const Sign: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  return (
    <View className="flex-1 bg-dark-navy">
      {isSignUp ? (<Login setIsSignUp={setIsSignUp} />) : (<SignUp setIsSignUp={setIsSignUp} />)}
    </View>
  );
}

export default Sign;
