import ApiInstance from "../api/api";

export const login = (loginData) => {
  return ApiInstance.post("api/auth/", loginData);
};

export const register = (registerData) => {
    return ApiInstance.post("api/auth/register", registerData);
}