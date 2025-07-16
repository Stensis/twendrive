import axios from "@/services/axiosInstance";

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  role: "car_owner" | "car_renter";
}) => {
  const response = await axios.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
  role: "car_owner" | "car_renter";
}) => {
  console.log("📤 Sending login request with data:", data); // ✅ Log the request payload

  const response = await axios.post(`/auth/login`, data);

  console.log("📥 Received login response:", response); // ✅ Log the full response

  return response;
};

export const verifyEmailToken = async (token: string) => {
  const response = await axios.get(`/auth/verify-email`, {
    params: { token },
  });
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await axios.post(`/auth/resend-email-verification`, {
    email,
  });
  return response.data;
};

export const verifyOtp = async (data: { userId: number; otp: string }) => {
  const response = await axios.post(`/auth/verify-otp`, data);
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  console.log("📤 Sending password reset request for email:", email);
  const response = await axios.post("/password/request-reset", { email });
  console.log("📥 Received response from server:", response.data);
  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axios.post("/password/reset-password", {
    token,
    password,
    confirmPassword,
  });
  return response.data;
};

export const logoutUser = async () => {
  return await axios.post("/auth/logout"); // Ensure this route exists in backend
};
