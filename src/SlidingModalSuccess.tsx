import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Easing,
  Vibration
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import LottieView from 'lottie-react-native'
import succes from '../assets/tick.json'
interface SuccessInterface {
  visible: boolean;
  onClose: () => void;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const successVibrationPattern = [0, 200, 100, 200];


const SlidingModalSuccess: React.FC<SuccessInterface> = ({ visible, onClose, setIsSignUp }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
      Vibration.vibrate(successVibrationPattern);
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
        className='items-center mb-4'
      >
        <LottieView style={{height: 120, width: 120}} source={succes} autoPlay loop />
      </View>
      <Text className='text-dark-navy text-center mb-2 text-xl'>Inscription réussie !</Text>
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
