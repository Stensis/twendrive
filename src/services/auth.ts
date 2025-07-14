import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  role: "car_owner" | "car_renter";
}) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
  role: "car_owner" | "car_renter";
}) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response;
};

export const verifyEmailToken = async (token: string) => {
  const response = await axios.get(`${API_URL}/verify-email`, {
    params: { token },
  });
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await axios.post(`${API_URL}/resend-email-verification`, {
    email,
  });
  return response.data;
};


export const verifyOtp = async (data: {
  userId: number;
  otp: string;
}) => {
  const response = await axios.post(`${API_URL}/verify-otp`, data);
  return response.data;
};