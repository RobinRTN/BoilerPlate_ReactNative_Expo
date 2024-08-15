import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { clearAuthState } from "./features/authSlice";

const useCustomApi = () : AxiosInstance => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const API: AxiosInstance = axios.create({
    baseURL: process.env.API_URL, // Ensure you're using env variables correctly
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const APIWithRateLimit = rateLimit(API, { maxRequests: 2, perMilliseconds: 1000 });


  APIWithRateLimit.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, (error: AxiosError) => {
    return Promise.reject(error);
  });

  APIWithRateLimit.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response) {
        const { status } = error.response;

        if (status === 401 || status === 403) { // 401 Unauthorized or 403 Forbidden
          dispatch(clearAuthState());
          navigation.navigate('Sign' as never); // Navigate to Sign-in screen
        }
      }

      return Promise.reject(error);
    }
  );

  return APIWithRateLimit;
};

export default useCustomApi;
