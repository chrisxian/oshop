import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

    constructor(public id: string,
        public dateCreated: string,
        public items: ShoppingCartItem[]) { }

    get totalItemsCount() {
        let count = 0;
        this.items?.forEach(item => count += item.quantity);
        return count;
    }
}