"use server"
import {getPayPayProduct} from "@/app/utils/stripe/paypaystripeTest";

export const saveProduct =  async () => {
    try {
        const productId = "04583037014938517504"

        const paypayProduct = await getPayPayProduct(productId);
        return { product: paypayProduct };
    } catch (err) {
        console.log(err)
        return  null
    }
} ;


