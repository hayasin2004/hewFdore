"use client"
import * as React from 'react';
import './userNavigation.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Link from "next/link";
import Images from "next/image"
import {useEffect, useState} from "react";
import confirmUser from "@/app/utils/user/confirmUser";
import {UserType} from "@/app/api/user/catchUser/route";

const style = {
    position: 'absolute',
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


const UserNavigation = (props: { src: string | undefined }) => {
    const [userData, setUserData] = useState<UserType | null>(null)
    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    useEffect(() => {
        const userData = async () => {
            const response = await confirmUser(token!)
            if (response !== undefined) {
                const responseParse = JSON.parse(response!)
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

            {props.src && userData?.profilePicture ?
                <Button onClick={handleOpen}>
                    <Images src={props.src ? props.src : "/profile.png"} style={{borderRadius: "50px"}} width={50}
                            height={50}
                            alt={"サンプルユーザーアイコン"}/>
                </Button>
                :
                <Button onClick={handleOpen}>

                    <Images src={"/profile.png"} style={{borderRadius: "50px"}} width={50} height={50}
                            alt={"サンプルユーザーアイコン"}/>
                </Button>

            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    {/*　ここ入れ子構造辞めた方がいいかも～ */}
                    <h2 id="parent-modal-title">{userData?.username}様</h2>
                    {/*<p id="parent-modal-description">*/}
                    {/*    保有ポイント 10pt*/}
                    {/*</p>*/}
                    {/*<p>*/}
                    {/*    <Link href={"listingcomplete_Itiosikinou"}>*/}
                    {/*        イチオシ機能*/}
                    {/*    </Link>*/}
                    {/*</p>*/}
                    <p id="child-modal-description">
                        <Link href={"confirmUser"}>
                            プロフィール
                        </Link>
                    </p>
                    <p id="child-modal-description">
                        <Link href={"favorite"}>
                            お気に入り登録ページ
                        </Link>
                    </p>
                    <p id="child-modal-description">
                        <Link href={"paidNote"}>
                            購入履歴
                        </Link>
                    </p>


                    {/*<ChildModal/>*/}
                    <div id={"Close_Logout"}>
                        <Button id={"closeButton"} onClick={handleClose}>閉じる</Button>
                        <p className={"cursor"} onClick={Logout}>
                            ログアウト
                        </p>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default UserNavigation;
