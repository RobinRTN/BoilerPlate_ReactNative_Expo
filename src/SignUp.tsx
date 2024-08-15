import { SafeAreaView, View, Text, TextInput, TouchableOpacity, GestureResponderEvent, Image } from "react-native";
import { Formik, Form, Field, ErrorMessage, FormikHelpers  } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AppNavigator from "./AppNavigator";
import { useNavigation } from "@react-navigation/native";




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

const SignUp: React.FC<LoginInterface> = ({setIsSignUp}) => {

  const navigation = useNavigation();

  const handleLogin = async (values: SignUpFormValues, { setSubmitting, resetForm }: FormikHelpers<SignUpFormValues>) => {
    try {
      const baseURL: string | undefined = process.env.API_URL;
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
        navigation.navigate('Login' as never);
      }
      resetForm();
    } catch (error: any) {
      console.error('Signup error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="pt-5 flex-1 justify-normal">
      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        validationSchema={SignUpSchema}
        validateOnMount
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid}) => (
          <View>
            <View className="items-center mt-10">
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
            <View className="h-8">
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
            <View className="h-8">
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
            />
            <View className="h-8">
              {touched.confirmPassword && errors.confirmPassword && (
                <Text className="mx-3 text-darker-purple">{errors.confirmPassword}</Text>
              )}
            </View>
            <TouchableOpacity
              className={` px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75  ${isValid ? "bg-darker-purple shadow-2xl" : "bg-black-alternative-lighter shadow"}`}
              onPress={handlePress(handleSubmit)}
              disabled={!isValid || isSubmitting}
            >
              <Text className="text-white text-lg text-center">S'inscrire</Text>
            </TouchableOpacity>
        </View>

        )
        }
      </Formik>
      <Text className="text-center text-classic-purple mt-5" onPress={() => setIsSignUp(prev => !prev)}>Déjà un compte ? Se connecter</Text>

    </SafeAreaView>
  )
}

export default SignUp;
