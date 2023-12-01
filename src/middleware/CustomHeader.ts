import { Request, Response, NextFunction } from "express";

const addCustomHeader = (headerName:string, headerValue:string) => {
  return (req:Request,res:Response, next:NextFunction) => {
    console.log(res.header(headerName, headerValue));

    next();
  };
};
export default addCustomHeader;
