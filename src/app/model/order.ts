import { ShoppingCart } from "./shopping-cart";


// compared exporting interface, class can have implementation, not just declaration in interface
export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: number, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.product.title,
                    imageUrl: i.product.imageUrl,
                    price: i.product.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }
}