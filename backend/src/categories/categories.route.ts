import {Router} from 'express';
import categoriesService from "./categories.service";
import subcategoriesRoute from "../subcategories/subcategories.route";

const categoriesRouter: Router = Router();

categoriesRouter.use('/:categoryId/subcategories', subcategoriesRoute);

categoriesRouter.route('/')
    .get(categoriesService.getAll)
    .post(categoriesService.createOne);

categoriesRouter.route('/:id')
    .get(categoriesService.getOne)
    .put(categoriesService.updateOne)
    .delete(categoriesService.deleteOne);

export default categoriesRouter;