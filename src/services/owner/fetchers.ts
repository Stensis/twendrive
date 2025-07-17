// services/owner/fetchers.ts
import axiosInstance from "@/services/axiosInstance";

export const getOwnerCars = async () => {
  const response = await axiosInstance.get("/car/owner_cars");
  return response.data;
};
