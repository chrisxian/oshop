import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
    id: string; // ObjectId in DB
    dateCreated: string;
    items: ShoppingCartItem[];
}