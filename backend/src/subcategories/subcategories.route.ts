import {Router} from 'express';
import subcategoriesService from "./subcategories.service";

const subcategoriesRoute: Router = Router({mergeParams: true});

subcategoriesRoute.route('/')
    .get(subcategoriesService.filterSubcategories, subcategoriesService.getAll)
    .post(subcategoriesService.setCategoryId, subcategoriesService.createOne);

subcategoriesRoute.route('/:id')
    .get(subcategoriesService.getOne)
    .put(subcategoriesService.updateOne)
    .delete(subcategoriesService.deleteOne);

export default subcategoriesRoute;