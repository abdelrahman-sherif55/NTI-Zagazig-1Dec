import {Document} from "mongoose";
import {CartItems} from "../cart/cart.interface";
import {Address, Users} from "../users/users.interface";

export interface Orders extends Document {
    items: CartItems;
    taxPrice: number;
    itemsPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
    payment: 'cash' | 'card'
    user: Users;
    address: Address;
}