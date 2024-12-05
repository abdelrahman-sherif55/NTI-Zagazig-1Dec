import {Router} from 'express';
import subcategoriesService from "./subcategories.service";
import subcategoriesValidation from "./subcategories.validation";

const subcategoriesRoute: Router = Router({mergeParams: true});

subcategoriesRoute.route('/')
    .get(subcategoriesService.filterSubcategories, subcategoriesService.getAll)
    .post(subcategoriesService.setCategoryId, subcategoriesValidation.createOne, subcategoriesService.createOne);

subcategoriesRoute.route('/:id')
    .get(subcategoriesValidation.getOne, subcategoriesService.getOne)
    .put(subcategoriesValidation.updateOne, subcategoriesService.updateOne)
    .delete(subcategoriesValidation.deleteOne, subcategoriesService.deleteOne);

export default subcategoriesRoute;