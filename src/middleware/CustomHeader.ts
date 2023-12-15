import { type Request, type Response, type NextFunction } from 'express';

class AddCustomHeaderMiddleware {
    path: string;

    private readonly headerName: string;

    private readonly headerValue: string;

    constructor(headerName: string, headerValue: string) {
        this.headerName = headerName;
        this.headerValue = headerValue;
        this.path = '/header';
    }

    public addCustomHeader = (
        req: Request,
        res: Response,
        next: NextFunction,
    ): any => {
        res.header(this.headerName, this.headerValue);
        next();
    };
}
export default AddCustomHeaderMiddleware;
