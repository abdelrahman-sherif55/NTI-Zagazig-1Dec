import {NextFunction, Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";
import ApiErrors from "./utils/apiErrors";
import Features from "./utils/features";

class RefactorService {
    getAll = <modelType>(model: mongoose.Model<any>, modelName?: string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let filterData: any = {};
            if (req.filterData) filterData = req.filterData;
            const documentsCount = await model.find(filterData).countDocuments();
            const features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName!).pagination(documentsCount);
            const {mongooseQuery, paginationResult} = features;
            const documents: modelType[] = await mongooseQuery;
            res.status(200).json({pagination: paginationResult, length: documents.length, data: documents});
        });
    createOne = <modelType>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const document: modelType = await model.create(req.body);
            res.status(201).json({data: document});
        });
    getOne = <modelType>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findById(req.params.id);
            if (!document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
            res.status(200).json({data: document});
        });
    updateOne = <modelType>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
            res.status(200).json({data: document});
        });
    deleteOne = <modelType>(model: mongoose.Model<any>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const document: modelType | null = await model.findByIdAndDelete(req.params.id);
            if (!document) return next(new ApiErrors(`${req.__('not_found')}`, 404));
            res.status(204).json();
        });
}

const refactorService = new RefactorService();
export default refactorService;