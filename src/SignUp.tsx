import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, GestureResponderEvent, Image, Modal, Animated, Dimensions, PanResponder } from "react-native";
import { Formik, FormikHelpers  } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from "react";
import SlidingModalSuccess from "./SlidingModalSuccess";
import LottieView from 'lottie-react-native';
import succes from "../assets/tick.json"
import Toast from 'react-native-toast-message';


const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide')
    .required('Champ requis'),
  password: Yup.string()
    .required('Champ requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Champ requis'),
});

const handlePress = (handleSubmit: () => void) => (event: GestureResponderEvent) => {
  event.preventDefault();
  handleSubmit();
};

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginInterface {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const getErrorMessage = (errorCode: string): string => {
  const errors: Record<string, string> = {
    "invalid_email": "Adresse email invalide",
    "invalid_email_format": "Format de l'email invalide",
    "required": "Champs requis",
    "password_min": "Le mot de passe doit comporter au moins 6 caractères.",
    "password_match": "Les mots de passe doivent correspondre",
    "email_taken": "L'email a déjà été pris.",
    "generic": "Une erreur s’est produite. Veuillez réessayer."
  };

  return errors[errorCode] || errors["generic"];
};


const SignUp: React.FC<LoginInterface> = ({setIsSignUp}) => {

  const [modalVisibleSuccess, setModalVisibleSuccess] = useState<boolean>(false);
  const closeModalSuccess = () => setModalVisibleSuccess(false);

  const handleSignUp = async (values: SignUpFormValues, { setSubmitting, resetForm }: FormikHelpers<SignUpFormValues>) => {
    try {
      const baseURL: string | undefined = "http://localhost:3001";
      if (!baseURL) {
        throw new Error('No API URL');
      }

      const response = await axios.post(`${baseURL}/signup`, {
        user: {
          email: values.email,
          password: values.password,
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setModalVisibleSuccess(true);
      }
      resetForm();
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorCode = error.response?.data?.code || 'generic';
      const errorMessage = getErrorMessage(errorCode);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorMessage,
      });
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
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={SignUpSchema}
            validateOnMount
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid }) => (
              <View>
                <View className="items-center mt-2">
                  <Image
                    source={require('../assets/splash.png')}
                    className="w-24 h-24 rounded-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-center text-xl text-pure-white mb-5 mt-10 bold">Bienvenue</Text>
                <TextInput
                  className="p-2 rounded bg-light-navy text-pure-white mb-2 text-lg mx-2"
                  placeholder="Email"
                  placeholderTextColor="#D3D3D3"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize='none'
                />
                <View className="h-6">
                  {touched.email && errors.email && (
                    <Text className="mx-3 text-darker-purple">{errors.email}</Text>
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
                  textContentType="newPassword"
                  autoCapitalize='none'
                />
                <View className="h-6">
                  {touched.password && errors.password && (
                    <Text className="mx-3 text-darker-purple">{errors.password}</Text>
                  )}
                </View>
                <TextInput
                  className="p-2 rounded bg-light-navy text-pure-white mb-2 text-lg mx-2"
                  placeholder="Confirmation mot de passe"
                  placeholderTextColor="#D3D3D3"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                  textContentType="newPassword"
                />
                <View className="h-4">
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text className="mx-3 text-darker-purple">{errors.confirmPassword}</Text>
                  )}
                </View>
                <TouchableOpacity
                  className={`px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75  ${isValid ? "bg-darker-purple shadow-2xl" : "bg-black-alternative-lighter shadow"}`}
                  onPress={handlePress(handleSubmit)}
                  disabled={!isValid || isSubmitting}
                >
                  <Text className="text-white text-lg text-center">{isSubmitting ? "Envoi..." : "S'inscrire"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Text className="text-center text-classic-purple mt-5" onPress={() => setIsSignUp(prev => !prev)}>Déjà un compte ? Se connecter</Text>
        </View>
      </SafeAreaView>
      <SlidingModalSuccess visible ={modalVisibleSuccess} onClose={closeModalSuccess} setIsSignUp={setIsSignUp} />
      <Toast />
    </KeyboardAvoidingView>
  )
}

export default SignUp;
