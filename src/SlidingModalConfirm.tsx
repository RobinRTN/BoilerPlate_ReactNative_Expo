import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  View,
  Text,
  Dimensions,
  PanResponder,
  TextInput,
  Keyboard,
  KeyboardEvent,
  TouchableOpacity
} from 'react-native';

interface ConfirmInterface {
  visible: boolean;
  onClose: () => void;
}

const SlidingModalConfirm: React.FC<ConfirmInterface> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.timing(slideAnim, {
            toValue: -keyboardHeight,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height;
      setKeyboardHeight(keyboardHeight);
      Animated.timing(slideAnim, {
        toValue: -keyboardHeight + 10,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (event: KeyboardEvent) => {
      setKeyboardHeight(0);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [slideAnim]);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

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
        {...panResponder.panHandlers}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: 40,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: '#ccc',
            }}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Sliding Modal</Text>
        <Text>This is a sliding modal with drag-to-dismiss!</Text>
        <TextInput
          placeholder="Enter something"
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 20,
            paddingHorizontal: 10,
          }}
        />
      </Animated.View>
    </Modal>
  );
};

export default SlidingModalConfirm;
