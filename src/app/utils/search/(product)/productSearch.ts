"use server"

import {Product} from "@/models/Product";
import {ProductType} from "@/app/utils/product/productDetail";
import {connectDB} from "@/lib/mongodb";

const productSearch = async (productSearchWord: string | null): Promise<string | null> => {
    await connectDB()
    const KatakanaHenkan = (productSearchWord: string | null) => {
        return productSearchWord?.replace(/[\u3041-\u3096]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) + 0x60)
        })
    }
    const HiraganaHenkan = (productSearchWord: string | null) => {
        return productSearchWord?.replace(/[\u30a1-\u30f6]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) - 0x60)
        })
    }
    try {

        const NormalizationWordKatakana = KatakanaHenkan(productSearchWord);
        const NormalizationWordHiragana = HiraganaHenkan(productSearchWord);
        const NormalizationWordUpper = productSearchWord?.toUpperCase();
        const NormalizationWordLower = productSearchWord?.toLowerCase();



        if (productSearchWord === null) {
            //console.log("文字を入力してください")
            return null
        }

        // 検索対象のモノを表示
        if (NormalizationWordKatakana !== undefined && NormalizationWordHiragana !== undefined && NormalizationWordUpper !== undefined && NormalizationWordLower !== undefined) {
            const searching: ProductType[] | null = await Product.find({
                    $or: [
                        {productName: {$regex: new RegExp(NormalizationWordHiragana, "i")}},
                        {productName: {$regex: new RegExp(NormalizationWordKatakana, "i")}},
                        {productName: {$regex: new RegExp(NormalizationWordUpper, "i")}},
                        {productName: {$regex: new RegExp(NormalizationWordLower, "i")}},
                    ]
                }
            ).exec()

            //console.log("あと三パーセント" + searching)
            return JSON.stringify(searching)
        }
        return null
    } catch (err) {
        return null
    }
}
export default productSearch;