const Joi = require("joi");

exports.createUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role_id: Joi.number().required(),
    contact_no: Joi.string().optional(),
    address: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message),
    });
  }

  next();
};
