import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

export type signUpData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type signInData = {
  email: string;
  password: string;
};

export const signUp = async (data: signUpData) => {
  const response = await axiosInstance.post("/api/v1/auth", {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
  });
  return response;
};

export const SignIn = async (data: signInData) => {
  const response = await axiosInstance.post("/api/v1/auth/sign_in", {
    email: data.email,
    password: data.password,
  });

  Cookies.set("access-token", response.headers["access-token"]);
  Cookies.set("client", response.headers["client"]);
  Cookies.set("uid", response.headers["uid"]);

  return response;
};

export const SignOut = async () => {
  const response = await axiosInstance.delete("/api/v1/auth/sign_out");

  Cookies.remove("access-token");
  Cookies.remove("client");
  Cookies.remove("uid");

  return response;
};