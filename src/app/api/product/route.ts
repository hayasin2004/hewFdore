import {Product} from "@/models/Product";
import {connectDB} from "@/lib/mongodb";
import React from "react";
import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {any} from "prop-types";

export  async  function GET(req : NextApiRequest , res : NextResponse){
    await  connectDB()
    if (req.method === "GET"){
        // _id: new ObjectId('6724500e5b27109064e40c08'),
        //     userId: '66dd839b7f87e2981ba6c7a0',
        //     productName: 'aaa',
        //     productDesc: null,
        //     productPrice: 1111,

        try {
            const product = await  Product.find();
            const productDetail : DBProductType[] = product.map((item , index) => {
                return {_id : item._id , userId : item.userId, productName : item.productName,  productDesc : item.productDesc , productPrice : item.productPrice}
                //     商品画像がない
            })
            // return  res.status(200).json({status : "Success" , data : productDetail})
            return  NextResponse.json({status : "Success" , data : productDetail})

        }catch (err){
            // res.status(500).json({status : "Error" , message : "商品の取得に失敗"})
            return  NextResponse.json({status : "Error" , message: "商品の取得に失敗"})

        }
    }else{
        console.log("動いていない")
        // res.status(404).json({status : "Error" , message : "そのメソッド違う"})
        return  NextResponse.json({status: "Error" , message : "メソッドが違うかも"})
    }

}


export interface DBProductType {
    _id : string;
    userId : string;
    productName : string;
    productDesc : string;
    productPrice : number;
}


