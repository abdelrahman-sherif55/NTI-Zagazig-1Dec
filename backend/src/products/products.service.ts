import { NextFunction, Request, Response } from 'express';
import productsSchema from './products.schema';
import { Products } from "./products.interface";
import refactorService from "../refactor.service";

class ProductsService {
    getAll = refactorService.getAll<Products>(productsSchema);
    createOne = refactorService.createOne<Products>(productsSchema);
    getOne = refactorService.getOne<Products>(productsSchema);
    updateOne = refactorService.updateOne<Products>(productsSchema);
    deleteOne = refactorService.deleteOne<Products>(productsSchema);
}

const productsService = new ProductsService();
export default productsService;