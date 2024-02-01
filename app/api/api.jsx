import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ApiInstance = axios.create({
  baseURL: "http://192.168.1.55:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiInstance;
