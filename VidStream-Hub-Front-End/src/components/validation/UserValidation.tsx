import * as yup from "yup";

// User Login validation
export const LoginValidation = yup.object().shape({
  username: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(21, "Password must be less than 21 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain upper and lower letters numbers and special characters"
    )
    .required("Password is required")
    .trim(),
});

// User Registration validation
export const RegisterValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(51, "Name must be less than 51 characters")
    .matches(/^[a-zA-Z ]*$/, "Name must contain only letters")
    .trim(),
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(21, "Password must be less than 21 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain letters numbers and special characters"
    )
    .required("Password is required")
    .trim(),
});

export const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(51, "Name must be less than 51 characters")
    .matches(/^[a-zA-Z ]*$/, "Name must contain only letters")
    .trim(),
  email: yup.string().email().required("Email is required").trim(),
});

export const ChangePasswordValidation = yup.object().shape({
  oldPassword: yup.string().required("oldPassword is required").trim(),
  newPassword: yup
    .string()
    .required("newPassword is required")
    .min(6, "newPassword must be at least 6 characters")
    .max(21, "newPassword must be less than 21 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain letters numbers and special characters"
    )
    .trim(),
  confirmPassword: yup
    .string()
    .required("confirmPassword is required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
    .trim(),
});

export const sendEmailValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
});

export const ForgotPasswordValidation = yup.object().shape({
  newPassword: yup
    .string()
    .required("newPassword is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain capital letters, numbers and special characters"
    )
    .trim(),
  confirmPassword: yup
    .string()
    .required("confirmPassword is required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
    .trim(),
});

export const userDataValidation = yup.object().shape({
  title: yup.string().required("Title is required").trim(),
  description: yup.string().trim(),
  isPublic: yup.boolean(),
});

export const AddVideoValidation = yup.object().shape({
  video_title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(111, "Title must be less than 111 characters")
    .trim(),
  video_description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 21 characters")
    .max(301, "Description must be less than 301 characters")
    .trim(),
  isPublic: yup.boolean(),
});

export const AddMusicValidation = yup.object().shape({
  music_title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(111, "Title must be less than 111 characters")
    .trim(),
  music_description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 21 characters")
    .max(301, "Description must be less than 301 characters")
    .trim(),
  isPublic: yup.boolean(),
});

export const AddPhotoValidation = yup.object().shape({
  photo_title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(111, "Title must be less than 111 characters")
    .trim(),
  photo_description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 21 characters")
    .max(301, "Description must be less than 301 characters")
    .trim(),
  isPublic: yup.boolean(),
});

export const AddDocumentValidation = yup.object().shape({
  document_title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(111, "Title must be less than 111 characters")
    .trim(),
  document_description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 21 characters")
    .max(301, "Description must be less than 301 characters")
    .trim(),
  isPublic: yup.boolean(),
});
