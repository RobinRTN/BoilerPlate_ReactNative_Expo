import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Easing
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";

interface SuccessInterface {
  visible: boolean;
  onClose: () => void;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SlidingModalSuccess: React.FC<SuccessInterface> = ({ visible, onClose, setIsSignUp }) => {
  const tickScaleAnim = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const playTickAnimation = () => {
    Animated.timing(tickScaleAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
      playTickAnimation();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleClick = () => {
    setIsSignUp(prev => !prev);
    onClose();
  };

  if (!visible) return null;


  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%']}
      enablePanDownToClose={true}
      onClose={onClose}
    >
      <View
        style={{
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: tickScaleAnim }],
            opacity: tickScaleAnim,
          }}
        >
          <MaterialIcons name="check-circle" size={64} color="#00A86B" />
        </Animated.View>
      </View>
      <Text className='text-dark-navy text-center my-2 text-xl'>Inscription réussie !</Text>
      <Text className='text-dark-navy text-center text-sm'>Veuillez vérifier votre boîte de réception pour confirmer votre email.</Text>
      <TouchableOpacity
        className='px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75 bg-darker-purple shadow-2xl'
        onPress={handleClick}
      >
        <Text className='text-white text-xl text-center'>Fermer</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default SlidingModalSuccess;
