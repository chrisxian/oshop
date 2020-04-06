import { Product } from ".";

export class ShoppingCartItem {
    
    constructor(public product: Product, public quantity: number){}
    
    get totalPrice() {
        return this.product ? this.product.price * this.quantity : 0;
    }
}