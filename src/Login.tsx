import { SafeAreaView, View, Text, TextInput, TouchableOpacity, GestureResponderEvent, Image } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide')
    .required('Champ requis'),
  password: Yup.string()
    .required('Champ requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  // confirmPassword: Yup.string()
  //   .nullable()
  //   .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
  //   .required('Champ requis'),
});

const handlePress = (handleSubmit: () => void) => (event: GestureResponderEvent) => {
  event.preventDefault();
  handleSubmit();
};


const handleLogin = () => {

}

interface LoginInterface {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;

}

const Login: React.FC<LoginInterface> = ({setIsSignUp}) => {


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

    </SafeAreaView>
  )
}

export default Login;
