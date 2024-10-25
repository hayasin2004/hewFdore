import React from 'react';
import "./toppageProducts.css"
import Product from "@/app/product/page";
import Image from "next/image"
import Link from "next/link";
import {products} from "@/app/api/dummyData/data";
import {productsProps} from "@/app/api/dummyData/data";


const ToppageProducts = () => {
    const data: productsProps[] = products
    return (
//
        <h1></h1>
)
    ;
};

export default ToppageProducts;