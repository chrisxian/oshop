export interface Product {
    id: string; // document id in the database
    title: string;
    price: number;
    category: string; // category id
    imageUrl: string;
}
