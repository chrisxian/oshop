import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from ".";

export class ShoppingCart {

    public items: ShoppingCartItem[] = [];

    constructor(public id: string,
        public dateCreated: string,
        public itemsArray: { product: Product, quantity: number }[]) {
        itemsArray?.forEach(x =>
            this.items.push(new ShoppingCartItem(x.product, x.quantity)));
    }

    get totalItemsCount(): number {
        let count = 0;
        this.items?.forEach(item => count += item.quantity);
        return count;
    }

    get totalPrice(): number {
        let sum = 0;
        this.items?.forEach(item => sum += item.totalPrice);
        return sum;
    }

    getQuantity(product: Product) {
        let item = this.items.find(x => x.product.id == product.id);
        return item ? item.quantity : 0
    }
}