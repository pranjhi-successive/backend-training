import Joi from "joi";
import data2 from "../utils/Data.js";
import { Request, Response, NextFunction } from "express";

const validationMiddlewareRequest = (req:Request,res:Response, next:NextFunction) => {
  const route = req.path;
  // console.log(route);
  const rules = data2[route];
// console.log(rules);


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
