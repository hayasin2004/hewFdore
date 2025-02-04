

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
    }

]