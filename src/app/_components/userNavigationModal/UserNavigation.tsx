import * as React from 'react';
import './userNavigation.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Link from "next/link";
import Images from "next/image"
import {useEffect, useState} from "react";
import confirmUser from "@/app/utils/user/confirmUser";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: '#605252',
    bgcolor: '#E8E8DB',
    border: '2px solid #605252',
    borderRadius: 5,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    lineHeight: 2,
};


function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button sx={{
                marginTop: 2,
                fontWeight: "bold",
                bgcolor: "#D0C7B2",
                color: "#605252",
                border: '2px solid #605252'
            }} onClick={handleOpen}>プロフィールナビゲーション</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >

                <Box sx={{
                    ...style
                }
                }>
                    <h2 id="child-modal-title">ユーザーナビゲーション</h2>
                    <p id="child-modal-description">
                        <Link href={"/confirmUser"}>
                            プロフィール
                        </Link>

                    </p>
                    <p id="child-modal-description">
                        <Link href={"/confirmPoints"}>
                            獲得ポイント履歴
                        </Link>
                    </p>
                    <p id="child-modal-description">
                        <Link href={"/favorite"}>
                            お気に入り登録ページ
                        </Link>
                    </p>
                    <p id="child-modal-description">
                        <Link href={"/paidNote"}>
                            購入履歴
                        </Link>
                    </p>
                    <Button sx={{
                        marginTop: 2,
                        fontWeight: "bold",
                        bgcolor: "#D0C7B2",
                        color: "#605252",
                        border: '2px solid #605252'
                    }} onClick={handleClose}>閉じる</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

const UserNavigation = ({src}) => {
    const [userData, setUserData] = useState()
    const token = localStorage.getItem("token")
    useEffect(() => {
        const userData = async () => {
            const response = await confirmUser(token)
            if (response !== undefined) {
                const responseParse = JSON.parse(response)
                setUserData(responseParse)
            }
        }
        userData()
    }, [token]);
    const Logout = async () => {
        await localStorage.removeItem("token");
        window.location.reload()
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <Images src={src} style={{borderRadius: "50px"}} width={50} height={50}
                        alt={"サンプルユーザーアイコン"}/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{userData?.username}様</h2>
                    <p id="parent-modal-description">
                        保有ポイント 10pt
                    </p>
                    <p>
                        <Link href={"listingcomplete_Itiosikinou"}>
                            イチオシ機能
                        </Link>
                    </p>
                    <p class={"cursor"} onClick={Logout}>
                        ログアウト
                    </p>
                    <ChildModal/>
                </Box>
            </Modal>
        </div>
    );
}

export default UserNavigation;
