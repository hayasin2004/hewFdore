"use server"
import {getPayPayProduct} from "@/app/utils/stripe/paypaystripeTest";

export const saveProduct =  async () => {
    console.log("蠢くんだ")
    try {
        const productId = "04583037014938517504"

        const paypayProduct = await getPayPayProduct(productId);
        // 取得したデータを処理（例：Stripeに保存など）
        // ここでは単にデータを返すだけにします
        return { product: paypayProduct };
    } catch (error) {
        console.log(error)
    }
} ;




