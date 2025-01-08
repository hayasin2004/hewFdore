// types.ts
export interface ProductItem {
    _id: string;         // MongoDBのIDのみを使用
    productName: string;
    productPrice: number;
    productDesc: string;
    userId: string;
}

export type DBProductType = ProductItem;