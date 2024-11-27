"use client"
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import useUser from "@/hooks/useUser";
import DirectMessageserver from "@/app/utils/user/DirectMessageserver";

const DirectMessage = ({params}: { params: { id?: string } } ) => {
    console.log(params);
    const detailUser = params?.id as string;
    console.log(detailUser)
    const {user} = useUser()
    const currentUser = user?._id;
    console.log(user?._id);
    const response = async () => {
        const MessageDate = await DirectMessageserver(detailUser, currentUser)
    }
    response()
    return (
        <>
            対象ユーザー : {params.id}
            <br/>
            ログインユーザー : {user?._id} , {user?.username}
        </>
    );
};

export default DirectMessage;