import {Router} from 'express';
import ordersService from "./orders.service";
import authService from "../auth/auth.service";

const paymentRouter: Router = Router();

paymentRouter.use(authService.protectedRoutes, authService.checkActive);

paymentRouter.post('/', ordersService.createOnlineOrder);

export default paymentRouter;