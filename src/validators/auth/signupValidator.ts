// src/validators/signupValidator.ts
import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters long")
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters long")
    .required("Last name is required"),

  userName: yup
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters long")
    .required("Username is required"),

  email: yup
    .string()
    .trim()
    .email("Email must be a valid email address (e.g., you@example.com)")
    .required("Email is required"),

  phone: yup
    .string()
    .trim()
    .matches(
      /^\+?[0-9]{7,15}$/,
      "Phone number must be valid and contain 7–15 digits"
    )
    .required("Phone number is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*#?&]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
