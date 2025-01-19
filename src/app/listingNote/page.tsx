"use client"
import
    React, {useEffect, useState} from 'react';
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import Image from "next/image";
import "./listingNote.css"
import Link from "next/link";
import purchaseProduct from "@/app/utils/product/purchaseProduct";
import useUser from "@/hooks/useUser";
import listingNote from "@/app/utils/product/listingNote";

const PaidNote = () => {
    const {user} = useUser()
    const userId = user?.userId
    const [productData, setProductData] = useState([])
    console.log(productData)
    useEffect(() => {
        const fetchPurchaseProduct = async () => {
            const response = await listingNote(userId)
            console.log(response)
            if (response  !== undefined) {
                setProductData(JSON.parse(response))
            }
            console.log(response)
        }
        fetchPurchaseProduct()
    }, [user]);


    return (
        <>
            <Header/>
            <span id={"btn"}>
                    <Link href={"toppage"}>
                <button>


                    戻る
                </button>
                    </Link>
            </span>
            <div className={"paidText"}>
                <h2 id={"PNtitle"}>
                    出品履歴
                </h2>
            </div>
            <div className={"listing"}>
                <div className={"listing_product"}>
                    {productData?.map((productItem) => (
                        <div key={productItem?._id}>
                            <div className={"product"}>
                                <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                                <div className={"product_text"}>
                                    <p>
                                        商品名 : {productItem?.productName}
                                    </p>
                                    <p>出品者 : {productItem?.sellerId}</p>
                                    <p>価格 : {productItem?.productPrice}</p>

                                </div>
                                <div className={"listingText"}>
                                    <h3>評価</h3>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>

                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                    <div className={"product"}>
                        <Image src={"/images/clothes/product.jpg"} width={200} height={200} alt={"購入履歴"}/>
                        <div className={"product_text"}>
                            <p>
                                商品名
                            </p>
                            <p>出品者 : xxxx</p>
                            <p>価格 : xxxx</p>
                        </div>
                        <div className={"listingText"}>
                            <h3>評価</h3>
                            <p>adfjdafjapdofjadjfpoadjfpoajdfpoadjfpasd;lfaslfjads;lfjasdlkfjadsjf;</p>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
        ;
}


export default PaidNote;