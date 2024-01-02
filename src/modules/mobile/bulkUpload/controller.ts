import { Request, Response } from 'express';

const importUser = async (req:Request, res:Response) => {
    try {
        res.send({ status: 200, success: true, message: 'running' });
    } catch (error:any) {
        res.send({ status: 400, success: false, message: error.message });
    }
};
export default importUser;
