import * as yup from "yup";

export const MovieValidation = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(51, "Title must be less than 51 characters")
    .trim(),
  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(1001, "Description must be less than 1001 characters")
    .trim(),
  year: yup.number(),
});

export const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(201, "Comment must be less than 201 characters")
    .trim(),
  movie_rating: yup.number().required("Select a Rating").min(0).max(5),
});

export const CreateMovieValidation = yup.object().shape({
  movie_title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(51, "Title must be less than 51 characters")
    .trim(),
  movie_description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(1001, "Description must be less than 1001 characters")
    .trim(),
  movie_catagory: yup.string().required("Catagory is required"),
  movie_language: yup.string().required("Language is required"),
  movie_year: yup.number().required("Year is required").positive().integer(),
  movie_time_duration: yup.string().required("Time Duration is required"),
});

export const CastValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .trim()
    .required("Name is required"),
});
