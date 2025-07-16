// validators/signInSchema.ts
import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RequestResetValidationSchema = yup.object({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
});