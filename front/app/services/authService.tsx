import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

export const signUp = async (data: SignUpData) => {
  const response = await axiosInstance.post("/api/v1/auth", {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.passwordConfirmation,
  });
  return response;
};

export const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post("/api/v1/auth", {
    email: data.email,
    password: data.password,
  });

  Cookies.set("access-token", response.headers["access-token"]);
  Cookies.set("client", response.headers["client"]);
  Cookies.set("uid", response.headers["uid"]);

  return response;
};

export const signOut = async () => {
  const response = await axiosInstance.delete("/api/v1/auth");

  Cookies.remove("access-token");
  Cookies.remove("client");
  Cookies.remove("uid");

  return response;
};