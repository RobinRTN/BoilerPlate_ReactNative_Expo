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
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { GestureResponderEvent } from 'react-native';

interface ForgetInterface {
  visible: boolean;
  onClose: () => void;
}

interface FormValues {
  email: string;
}

const SlidingModalForget: React.FC<ForgetInterface> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const emailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Email invalide')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide')
    .required('Champ requis'),
  });

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const baseURL: string | undefined = "http://localhost:3001";
    if (!baseURL) {
      throw new Error('No API URL');
    }
    try {
      const response = await axios.post(`${baseURL}/users/resend_confirmation`, { email: values.email });
      setSubmitting(false);
    } catch (error: any) {
      setSubmitting(false);
    }
  };

  const handlePress = (handleSubmit: () => void) => (event: GestureResponderEvent) => {
    event.preventDefault();
    handleSubmit();
  };

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
        <Text className='text-xl text-center my-2 text-dark-navy'>Réinitialiser mot de passe</Text>
        <Text className='text-sm text-center my-2 text-dark-navy'>Un email te sera envoyé pour réinitialiser ton mot de passe actuel 📫</Text>
        <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <Field type="email" name="email" placeholder="Ton adresse email" className="px-4 py-2 rounded border-dark-navy bg-slate-200 text-lg mx-2" />
                  <ErrorMessage name="email" component="div" className="error-message" />

                  <TouchableOpacity
                  className={` px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75  ${isValid ? "bg-darker-purple shadow-2xl" : "bg-black-alternative-lighter shadow"}`}
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                >
                  <Text className="text-white text-lg text-center">S'inscrire</Text>
                </TouchableOpacity>
                </Form>
            )}
            </Formik>
        <TextInput
          placeholder="Ton adresse email"
          className='px-4 py-2 rounded border-dark-navy bg-slate-200 text-lg mx-2'
        />
        <TouchableOpacity
          className={`px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75 bg-darker-purple shadow-2xl`} >
          <Text className="text-white text-lg text-center">Réinitialiser</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default SlidingModalForget;
