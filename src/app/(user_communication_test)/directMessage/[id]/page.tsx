"use client"
import React, {useEffect} from 'react';
import useUser from "@/hooks/useUser";
import DirectMessageserverAction from "@/app/utils/user/DirectMessageserverAction";


const DirectMessage = ({params} : {params : {id? :string}}) => {
    console.log(params);
    const detailUser  = params?.id as string;
    const {user} = useUser()
    const currentUser = user?._id as string
    console.log(JSON.stringify(user));
    useEffect(() => {
        const response = async () => {
            // const MessageDate = await DirectMessageserverAction(detailUser ,currentUser)

        }
        response()
    }, []);
    return (
        <>

            対象ユーザー : {params.id}
            <br/>
            ログインユーザー : {user?._id} , {user?.username}
        </>
    );
};

export default DirectMessage;