import React from 'react';
import "./DirectMessageStatus3.css"

const DirectMessageStatus3 = (params) => {
    console.log(params?.chatData);
    return (
        <div>
            DirectMessageStatus3
            {params?.chatData?.map((item) => (
                item.chatUserRole == "チャットルーム制作者" ?
                    <div className={"chatLeft-"} key={item._id}>
                        <div className={"chatLeft"}>{item?.message}</div>
                        <div className={"chatLeft"}>{item?.senderUserId}</div>
                    </div>
                    :
                    <div className={"chatRight-"} key={item._id}>
                        <div className={"chatRight"}>{item?.senderUserId}</div>
                        <div className={"chatRight"}>{item?.message}</div>
                    </div>
            ))}
        </div>
    );
}


export default DirectMessageStatus3;