import { SafeAreaView, View, Text, TextInput, TouchableOpacity, GestureResponderEvent, Image, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Animated } from "react-native";
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SlidingModalForget from "./SlidingModalForget";
import SlidingModalConfirm from "./SlidingModalConfirm";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "./features/authSlice";



const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide')
    .required('Champ requis'),
  password: Yup.string()
    .required('Champ requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const handlePress = (handleSubmit: () => void) => (event: GestureResponderEvent) => {
  event.preventDefault();
  handleSubmit();
};

interface SignInFormValues {
  email: string;
  password: string;
}

interface LoginInterface {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;

}

const Login: React.FC<LoginInterface> = ({setIsSignUp}) => {

  const [modalVisibleForget, setModalVisibleForget] = useState<boolean>(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState<boolean>(false);

  const closeModalForget = () => setModalVisibleForget(false);
  const openModalForget = () => setModalVisibleForget(true);

  const closeModalConfirm = () => setModalVisibleConfirm(false);
  const openModalConfirm = () => setModalVisibleConfirm(true);

  const handleResponse = async (response: any) => {
    const dispatch = useDispatch();

    const authHeader = response.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    const { id, email, username, picture_number } = response.data.status.data.user;

    dispatch(setAuthState({
      accessToken: token,
      userId: id,
      userEmail: email,
      username: username,
      userPicture: picture_number
    }));
  }

  const handleLogin = async (values: SignInFormValues, { setSubmitting, resetForm }: FormikHelpers<SignInFormValues>) => {
    try {
      const baseURL: string | undefined = "http://localhost:3001";
      if (!baseURL) {
        throw new Error('No API URL');
      }
      const response = await axios.post(`${baseURL}/login`, {
        user: {
          email: values.email,
          password: values.password
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        handleResponse(response);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} 
    >
      <SafeAreaView className="flex-1 justify-center">
        <View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={SignUpSchema}
            validateOnMount
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid}) => (
              <View>
                <View className="items-center mt-6">
                  <Image
                    source={require('../assets/splash.png')}
                    className="w-24 h-24 rounded-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-center text-xl text-pure-white mb-10 mt-10 bold">Bienvenue</Text>
                <TextInput
                  className="p-2 rounded bg-light-navy text-pure-white mb-2 text-lg mx-2"
                  placeholder="Email"
                  placeholderTextColor="#D3D3D3"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <View className="h-6">
                  {touched.email && errors.email && (
                    <Text className="mx-3 text-darker-purple mb-2">{errors.email}</Text>
                  )}
                </View>
                <TextInput
                  className="p-2 rounded bg-light-navy text-pure-white mb-2 text-lg mx-2"
                  placeholder="Mot de passe"
                  placeholderTextColor="#D3D3D3"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                <View className="h-4">
                  {touched.password && errors.password && (
                    <Text className="mx-3 text-darker-purple">{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity
                  className={` px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75  ${isValid ? "bg-darker-purple shadow-2xl" : "bg-black-alternative-lighter shadow"}`}
                  onPress={handlePress(handleSubmit)}
                  disabled={!isValid || isSubmitting}
                >
                  <Text className="text-white text-lg text-center">Se connecter</Text>
                </TouchableOpacity>
            </View>
            )
            }
          </Formik>
          <Text className="text-center text-classic-purple mt-5" onPress={() => setIsSignUp(prev => !prev)}>Pas encore de compte ? S'inscrire</Text>
          <Text className="text-center text-darker-purple mt-3" onPress={openModalForget}>Mot de passe oublié ?</Text>
          <Text className="text-center text-darker-purple mt-2" onPress={openModalConfirm}>Email de confirmation non reçu?</Text>
        </View>
      </SafeAreaView>
      <SlidingModalForget visible ={modalVisibleForget} onClose={closeModalForget} />
      <SlidingModalConfirm visible ={modalVisibleConfirm} onClose={closeModalConfirm} />
    </KeyboardAvoidingView>
  )
}

export default Login;
