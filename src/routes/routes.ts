import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {
    HealthCheck,
} from '../middleware/index';
import mobileRouter from '../modules/mobile/route';
import userRouter from '../modules/user/routes/UserRoutes';
import authRouter from '../modules/user/routes/AuthRouter';
import bulk from '../modules/mobile/bulkUpload/broute';
import countryRouter from '../modules/country/route';
import middlewareRouter from '../middleware/middleware';
import swaggerSpec from '../swaggerConfig';

const router = express.Router();
const healthCheck = new HealthCheck();
router.get(healthCheck.path, HealthCheck.getHealth);
router.get('/middleware', middlewareRouter);
router.use('/country', countryRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/api', mobileRouter);
router.use('/up', bulk);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;
