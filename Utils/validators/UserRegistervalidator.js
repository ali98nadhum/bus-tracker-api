const Joi = require("joi");

const registerValidator = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must not exceed 50 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .max(255)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be valid",
      "string.empty": "Email is required",
      "string.max": "Email must not exceed 255 characters",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase letter")
    .pattern(/[a-z]/, "lowercase letter")
    .pattern(/[0-9]/, "number")
    .pattern(/[^A-Za-z0-9]/, "special character")
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.name": "Password must contain at least one {#name}",
      "any.required": "Password is required",
    }),
});

module.exports = {
  registerValidator,
};
