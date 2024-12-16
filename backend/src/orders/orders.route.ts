import {Router} from 'express';
import ordersService from "./orders.service";
import authService from "../auth/auth.service";

const ordersRouter: Router = Router();

ordersRouter.use(authService.protectedRoutes, authService.checkActive);

ordersRouter.route('/')
    .get(ordersService.filterOrders, ordersService.getAll)
    .post(authService.allowedTo('user'), ordersService.createCashOrder);

ordersRouter.put('/:id/deliver', authService.allowedTo('admin', 'employee'), ordersService.deliverOrder);
ordersRouter.put('/:id/pay', authService.allowedTo('admin', 'employee'), ordersService.payOrder);

export default ordersRouter;