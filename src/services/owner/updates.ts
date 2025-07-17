import { UpdateUserProfileDTO } from "@/lib/owner/types";
import axios from "@/services/axiosInstance";

export const updateUserProfile = async (data: UpdateUserProfileDTO | FormData) => {
  const isFormData = data instanceof FormData;

  const response = await axios.put("/users/update/me", data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });

  return response.data;
};

// TO ADD A CAR:
export const addCar = async (carData: any) => {
  const response = await axios.post("/car/add-car", carData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
