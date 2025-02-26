"use server"

import {connectDB} from "@/lib/mongodb";
import {Purchase} from "@/models/Purchase";
import {UserType} from "@/app/api/user/catchUser/route";

export interface tradeChatStatusType {
    chatExists?: string,
    chatExistsPart2?: string,
    chatId: string,
    currentUserId: string,
    partnerUserId: string

}


const TradeProductMessageServer = async (currentUserId: string  | undefined, sellerId?: string | null) => {
    await connectDB()
    try {
        console.log("アイスクリーム" + currentUserId, sellerId)

        if (await currentUserId !== undefined && sellerId !== undefined && currentUserId !== null && sellerId !== null) {
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
                const chatExistsPart2 = await Purchase.findOne({
                    buyerId: currentUserId,
                    sellerId: sellerId
                })
                if (chatExistsPart2) {
                    const chatId :string = chatExistsPart2._id
                    return {
                        chatExistsPart2: {
                            chatId: chatId,
                            currentUserId: currentUserId,
                            partnerUserId: chatExistsPart2.sellerId as string
                        }
                    }
                }
            }
        }else {
            return null
        }
        return  null
    } catch
        (err) {
        console.log(err)
        return null
    }
}
export default TradeProductMessageServer
