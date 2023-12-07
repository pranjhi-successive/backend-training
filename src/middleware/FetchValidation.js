import Joi from "joi";
import Data2 from "../utils/Data.js";

const validationMiddlewareRequest = (req, res, next) => {
  const route = req.path;
  const rules = Data2[route];

  if (rules) {
    const { error } = Joi.object(rules).validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  }

  next();
};

export default validationMiddlewareRequest;
