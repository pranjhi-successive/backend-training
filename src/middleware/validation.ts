import Joi from "joi";
import { Request, Response, NextFunction } from "express";


class SchemaValidation {
  path: string;
  constructor() {
    this.path = "/schema";
  }
  public userSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  // Validation middleware function
  public validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ error: error });
      }
      next();
    };
  };
}
export default SchemaValidation;
