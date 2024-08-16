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

interface SuccessInterface {
  visible: boolean;
  onClose: () => void;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SlidingModalSuccess: React.FC<SuccessInterface> = ({ visible, onClose, setIsSignUp }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const tickScaleAnim = useRef(new Animated.Value(0)).current;

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

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
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => playTickAnimation());
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClick = () => {
    setIsSignUp(prev => !prev);
    closeModal();
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={closeModal}
    >
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'white',
          transform: [{ translateY: slideAnim }],
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 16,
        }}
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
      </Animated.View>
    </Modal>
  );
};

export default SlidingModalSuccess;
