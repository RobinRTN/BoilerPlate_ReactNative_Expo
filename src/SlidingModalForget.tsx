import BottomSheet, {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from "axios";


interface ConfirmInterface {
  visible: boolean;
  onClose: () => void;
}

const SlidingModalConfirm: React.FC<ConfirmInterface> = ({ visible, onClose }) => {

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '50%'], []);

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
      await axios.post(`${baseURL}/users/resend_confirmation`, { email: values.email });
      setSubmitting(false);
      closeBottomSheet();
    } catch (error: any) {
      setSubmitting(false);
    }
  };

  return (
    <BottomSheet
    ref={bottomSheetRef}
    snapPoints={snapPoints}
    onChange={handleSheetChanges}
    enablePanDownToClose={true}
  >
      <Text className="my-3 text-xl text-dark-navy bold text-center">Réinitialiser mot de passe</Text>
      <Text className="my-3 text-sm text-dark-navy text-center">Un email te sera envoyé pour réinitialiser ton mot de passe actuel 📫</Text>

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
    </BottomSheet>
  );


}

export default SlidingModalConfirm;
