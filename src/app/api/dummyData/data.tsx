import React from 'react';

export interface productsProps {
    id: number;
    productName: string;
    productDesc: string;
    productImage: string;
    category:string[];
    published: string;
    price: number;
    size: string;
    condition: string
    author: {
        userName: string;
    };
}

export const products: productsProps[] = [
    {
        id: 1,
        productName: "ニット",
        productDesc: "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage: "/images/clothes/product.jpg",
        category: ["トップス"],
        published: "",
        size: "M",
        condition: " 多少使用感がある",
        price: 2000,
        author: {
            userName: "Akari",
        }
    },
    {
        id: 2,
        productName: "コート",
        productDesc: "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage: "/images/clothes/product2.jpg",
        category: ["トップス"],
        published: "",
        size: "M",
        condition: " 未使用",
        price: 7000,
        author: {
            userName: "Yumi",
        }
    },
    {
        id : 3,
        productName : "キャミソール",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product3.jpg",
        category :["トップス"] ,
        published :"",
        size : "M",
        condition :" 多少使用感がある",
        price : 1500 ,
        author :{
            userName : "Hana",
        }
    },
    {
        id : 4,
        productName : "秋服セット",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product4.jpg",
        category :["トップス" , "デニム"],
        published :"",
        size : "M",
        condition :" 多少使用感がある",
        price : 12000 ,
        author :{
            userName : "Yuki",
        }
    },
    {
        id : 5,
        productName : "香水",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product5.jpg",
        category :["香水" ],
        published :"",
        size : "",
        condition :" 多少使用感がある",
        price : 2000 ,
        author :{
            userName : "Koharu",
        }
    },
    {
        id : 7,
        productName : "スカート",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product6.jpg",
        category :["スカート" ],
        published :"",
        size : "M",
        condition :" 多少使用感がある",
        price : 3000 ,
        author :{
            userName : "Uika",
        }
    }　,
    {
        id : 8,
        productName : "ワンピース",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product7.jpg",
        category :["トップス" ],
        published :"",
        size : "M",
        condition :" 多少使用感がある",
        price : 5000 ,
        author :{
            userName : "Rin",
        }
    }　,
    {
        id : 7,
        productName : "カーディガン",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product6.jpg",
        category :["トップス" ],
        published :"",
        size : "M",
        condition :" 多少使用感がある",
        price : 3000 ,
        author :{
            userName : "Ai",
        }
    },
    {
        id : 8,
        productName : "ニット",
        productDesc : "何回か使用していましたが特に目立った汚れはなくほぼ新品です。",
        productImage : "/images/clothes/product8.jpg",
        category :["トップス" ],
        published :"",
        size : "M",
        condition :" 多少使用感がある",
        price : 2800 ,
        author :{
            userName : "Yuuna",
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
