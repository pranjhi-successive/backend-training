import { Request, Response, NextFunction } from "express";

const logger = (req:Request, res:Response, next:NextFunction) => {
  const timeStamp = new Date();
  console.log(`${timeStamp} ${req.method} ${req.url} ${req.ip}`);
  next();
};

export default logger;
