import {
    type Request,
    type Response,
    type NextFunction,
    Router,
} from 'express';

class ValidateNumericMiddleware {
    path: string;

    public router = Router();

    static validateNumeric = (
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        const numeric = ['parameter1', 'parameter2'];
        // eslint-disable-next-line no-restricted-syntax
        for (const param of numeric) {
            if (req.query[param] && Number.isNaN(Number(req.query[param]))) {
                res
                    .status(400)
                    .json({ error: `invaid for ${param} must be numeric` });
                return;
            }
        }
        next();
    };

    constructor() {
        this.path = '/numeric';
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(this.path, ValidateNumericMiddleware.getnumeric);
    }

    static readonly getnumeric = (req: Request, res: Response): void => {
        res.status(200).json({
            status: 'OK',
            message: ' successfully executed',
            time: new Date(),
        });
    };
}
export default ValidateNumericMiddleware;
