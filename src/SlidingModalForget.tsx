import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ViewComponent } from 'react-native';
import { Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import LottieView from "lottie-react-native";
import succes from '../assets/tick.json';
import fail from '../assets/fail.json';

interface ConfirmInterface {
  visible: boolean;
  onClose: () => void;
}

const SlidingModalConfirm: React.FC<ConfirmInterface> = ({ visible, onClose }) => {

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '50%'], []);
  const [beenSubmit, setBeenSubmit] = useState<boolean>(false);
  const [submitSucces, setSubmitSucces] = useState<boolean>(false);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email invalide')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide')
      .required('Champ requis'),
  });
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  interface FormValues {
    email: string;
  }

  if (!visible) return null;

    const handleFormSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      const baseURL: string | undefined = "http://localhost:3001";
      if (!baseURL) {
        throw new Error('No API URL');
      }
      try {
        const response = await axios.post(`${baseURL}/users/resend_confirmation`, { email: values.email });
        if (response.status === 200) {
          setSubmitSucces(true)
          setSubmitting(false);
        } else {
          setSubmitSucces(false);
        }
      } catch (error: any) {
        setSubmitSucces(true);
        setSubmitting(false);
      }
      setBeenSubmit(true);
  };

  const closeHandle = () => {
    setBeenSubmit(false);
    setSubmitSucces(false);
    closeBottomSheet();
  }

  const continueHandle = () => {
    setBeenSubmit(false);
    setSubmitSucces(false);
  }

  return (
    <BottomSheet
    ref={bottomSheetRef}
    snapPoints={snapPoints}
    onChange={handleSheetChanges}
    enablePanDownToClose={true}
  >
      <Text className="my-3 text-xl text-dark-navy bold text-center">Réinitialiser mot de passe</Text>

      {beenSubmit ?
      (
        submitSucces ?
        (<View className='items-center'>
          <LottieView style={{height: 120, width: 120}} source={succes} autoPlay loop />
          <Text className="my-3 text-sm text-dark-navy text-center">Email de réinitialisation envoyé avec succès !</Text>
          <TouchableOpacity
              className={`px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75 bg-darker-purple shadow-2xl w-5/6`}
              onPress={closeHandle}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Continuer</Text>
            </TouchableOpacity>

        </View>
        )
        :
        (<View className='items-center'>
          <LottieView style={{height: 80, width: 80}} source={fail} autoPlay loop />
          <Text className="my-3 text-sm text-dark-navy text-center">Echec de l'envoi, veuillez vérifier l'email indiqué !</Text>
          <TouchableOpacity
              className={`px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75 bg-darker-purple shadow-2xl w-5/6`}
              onPress={continueHandle}
            >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Réessayer</Text>
          </TouchableOpacity>
      </View>)
      )
      : (
        <View>
          <Text className="my-3 text-sm text-dark-navy text-center mx-3">Un email te sera envoyé pour réinitialiser ton mot de passe actuel 📫</Text>
          <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleFormSubmit}
        >
          {({ submitForm, isSubmitting, isValid, handleChange, handleBlur, values, errors, touched }) => (
            <View className="mx-4">
              <BottomSheetTextInput
                placeholder="Email"
                placeholderTextColor="#1c2432"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{
                  height: 40,
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 20,
                  color: "#02012B",
                  paddingHorizontal: 10,
                  backgroundColor: 'lightgray',
                  marginHorizontal: 7
                }}
              />
              <View className="h-6 mx-2">
                {touched.email && errors.email && (
                  <Text className=" text-darker-purple mb-2">{errors.email}</Text>
                )}
              </View>
              <TouchableOpacity
                className={`px-4 py-2 rounded mx-2 mt-4 transition ease-in-out duration-75  ${isValid ? "bg-darker-purple shadow-2xl" : "bg-black-alternative-lighter shadow"}`}
                onPress={submitForm}
                disabled={!isValid || isSubmitting}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Réinitialiser</Text>
              </TouchableOpacity>
            </View>
          )}
          </Formik>
        </View>
      )
      }


    </BottomSheet>
  );


}

export default SlidingModalConfirm;
