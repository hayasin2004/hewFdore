import React from 'react';
import "./DirectMessageStatus1.css"

const DirectMessageStatus1 = (params) => {
    console.log(params?.chatData);
    return (
        <div>
            {/*DirectMessageStatus1*/}
            {params?.chatData?.map((item) => (
                item.chatUserRole == "チャットルームを作成された側" ?
                    <div className={"chatLeft-"} key={item._id}>
                        <div className={"chatLeft"}>{item?.message}</div>
                        {/*<div className={"chatLeft"}>{item?.senderUserId}</div>*/}
                    </div>
                    :
                    <div className={"chatRight-"} key={item._id}>
                        {/*<div className={"chatRight"}>{item?.senderUserId}</div>*/}
                        <div className={"chatRight"}>{item?.message}</div>
                    </div>
            ))}
        </div>
    );
}


export default DirectMessageStatus1;