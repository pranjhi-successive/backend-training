import Joi from "joi";
export default class Validation {
  static create(data: any) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(10).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      address: Joi.object({
        line1: Joi.string().required(),
        line2: Joi.string().required(),
        line3: Joi.string().required(),
      }).required(),
    });

    return schema.validate(data);
  }

  static update(data: any) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50),
      phone: Joi.string().min(10).max(15),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      address: Joi.object({
        line1: Joi.string(),
        line2: Joi.string(),
        line3: Joi.string(),
      }),
    });

    return schema.validate(data);
  }
}
