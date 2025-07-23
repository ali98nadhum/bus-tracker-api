const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((e) => e.message);
    return res.status(400).json({
      message: "Validation failed",
      errors: messages,
    });
  }
  next();
};

module.exports = validate;
