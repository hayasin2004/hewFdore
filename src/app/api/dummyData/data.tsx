import React from 'react';

export interface productsProps {
    id : number;
    productName: string;
    productDesc:string;
    category: string;
    published: string;
    price: number;
    author : {
        userName: string;
    };
}

export const  products : productsProps[] =　[
        {
            id : 1,
            productName : "ワンピース",
            productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
            category :"" ,
            published :"",
            price : 100 ,
            author :{
                userName : "Igushi",
            }
        },
        {
            id : 2,
            productName : "ワンピース",
            productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
            category :"" ,
            published :"",
            price : 100 ,
            author :{
                userName : "Matsui",
            }
        }

]

//ダミーデータのテンプレート
// {
//     id : 1,
//         productName : "",
//     productDesc : "",
//     category :"" ,
//     published :"",
//     price : "",
//     author :{
//     username : "",
// }
// }
