import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import cartSchema from "./cart.schema";
import ApiErrors from "../utils/apiErrors";

class CartService {
    getCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const cart = await cartSchema.findOne({user: req.user._id});
        if (!cart) return next(new ApiErrors('your cart is empty', 404));
        res.status(200).json({data: cart});
    });
    clearCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const cart = await cartSchema.findOneAndDelete({user: req.user._id});
        if (!cart) return next(new ApiErrors('your cart is empty', 404));
        res.status(204).json({});
    });
}

const cartService = new CartService();
export default cartService;