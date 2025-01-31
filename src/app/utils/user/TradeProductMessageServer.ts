"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";


const TradeProductMessageServer = async (currentUserId: string | null, sellerId?: string| null): Promise<string | {
    chatExists: { chatId: string, currentUserId: string, partnerUserId: string }
} | { chatExistsPart2: { chatId: string, currentUserId: string, partnerUserId: string } } | undefined | null> => {
    await connectDB()
    try {
        console.log("アイスクリーム" +  currentUserId,sellerId)

        if (await currentUserId !== undefined && sellerId !== undefined &&  currentUserId !== null && sellerId !== null) {
            // ログインしているのが出品者
            if (currentUserId == sellerId) {
                const chatExists = await Purchase.findOne({
                    sellerId: currentUserId,
                })
                if (chatExists) {
                    const chatId: string = chatExists._id

                    return {
                        chatExists: {
                            chatId: chatId,
                            currentUserId: currentUserId,
                            partnerUserId: chatExists.buyerId as string
                        }
                    }

                }
            }
            if (currentUserId !== sellerId) {
                // 既にチャットがあるかどうかの処理
                const chatExistsPart2 = await Purchase.findOne({
                    buyerId: currentUserId,
                    sellerId: sellerId
                })
                if (chatExistsPart2) {
                    const chatId = chatExistsPart2._id
                    return {
                        chatExistsPart2: {
                            chatId: chatId,
                            currentUserId: currentUserId,
                            partnerUserId: chatExistsPart2.sellerId
                        }
                    }
                } else {
                    return null
                }
            }
        }
    } catch
        (err) {
        console.log(err)
        return null
    }
}
export default TradeProductMessageServer
