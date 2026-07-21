const { z } = require("zod");

const imageSchema = z.object({
  originalname: z.string(),
  mimetype: z.enum(
    ["image/jpeg", "image/png", "image/webp"],
    {
      errorMap: () => ({
        message: "Only JPEG, PNG and WEBP images are allowed",
      }),
    }
  ),
  size: z
    .number()
    .max(2 * 1024 * 1024, "Image size must not exceed 2MB"),
});

const userStoreSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).trim().min(2),

  email: z.string({
    required_error: "Email address is required",
    invalid_type_error: "Email address must be a string",
  }).trim().email("Email must be a valid email address"),

  avatar: imageSchema.optional(),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(6, "Password must be at least 6 characters"),

  password_confirmation: z.string({
    required_error: "Password confirmation is required",
    invalid_type_error: "Password confirmation must be a string",
  }).min(6, "Password confirmation must be at least 6 characters"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Password confirmation does not match",
  path: ["password_confirmation"],
});

const authLoginSchema = z.object({
  email: z.string().trim().email("Email must be a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = {
  userStoreSchema,
  authLoginSchema,
};