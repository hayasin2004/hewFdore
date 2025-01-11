"use server"

import {string} from "prop-types";
import {User} from "@/models/User";
import {connectDB} from "@/lib/mongodb";
import {MongoClient} from "mongodb";

import {Server} from "socket.io";
import mongoose from "mongoose";
import {Chat, ChatType} from "@/models/Chat";
import {UserType} from "@/app/api/user/catchUser/route";
import {v4 as uuidv4} from 'uuid';
import {Purchase} from "@/models/Purchase";


const TradeProductMessageServer = async (currentUserId?: string, sellerId?: string) => {
    console.log("アイスクリーム" + sellerId, currentUserId)
    await connectDB()
    try {
        if (currentUserId !== undefined && sellerId !== undefined) {
            // ログインしているのが出品者
            if (currentUserId == sellerId) {
                const chatExists = await Purchase.findOne({
                    sellerId: currentUserId,
                })
                if (chatExists) {
                    const chatId = chatExists._id
                    console.log(chatId)
                    console.log("既にcurrentUserId , sellerIdのチャットルームが作られています")
                    // const returnUserData = async () => {
                    //     const currentUserIdData = await User.findById({_id: chatExists.currentUserId}).select("username email profilePicture coverProfilePicture").exec();
                    //     const sellerIdData = await User.findById({_id: chatExists.sellerId}).select(" username email profilePicture coverProfilePicture").exec();
                    // console.log("うけとり" + currentUserIdData)
                    // return {currentUserId: currentUserIdData?._id, sellerId: sellerIdData?._id}
                    return {
                        chatExists: {
                            chatId: chatId,
                            currentUserId: currentUserId,
                            partnerUserId: chatExists.buyerId
                        }
                    }

                }
                console.log(currentUserId, sellerId)
                console.log("currentUserIdとsellerIdが同じであるためチャットをさくせいすることができません")
                return {currentUserId};
            }
            if (currentUserId !== sellerId) {
                // 既にチャットがあるかどうかの処理
                const chatExistsPart2 = await Purchase.findOne({
                    buyerId: currentUserId,
                    sellerId: sellerId
                })
                console.log("購入者もしくは販売者のどちらかが購入したときのIDが違います。" + chatExistsPart2)
                if (chatExistsPart2) {
                    const chatId = chatExistsPart2._id
                    console.log(chatId)
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
