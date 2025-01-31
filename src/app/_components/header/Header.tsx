"use client"
import React, {useEffect} from 'react';
import "./Heder.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Tab, Tabs} from "@mui/material";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import UserNavigationModal from "@/app/_components/userNavigationModal/UserNavigation";

interface User {
    userId: string
    username: string
    email: string
    password: string
    profilePicture: string
    coverProfilePicture: string
}


const Header = () => {
    const {user} = useUser()
    console.log(user?.username)
    console.log(user?.userId)
    console.log(user?.email)


    // 通知用モーダル
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }


    function CustomTabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{p: 3}}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '37%',
        left: '80%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <header>
                <div className="nav">
                    <div className="title">
                        <Link href={"/"}>
                            <h1>
                                F'dore
                            </h1>
                        </Link>
                    </div>
                    <div className="bar">
                        <ul>
                            <li>
                                <Link href={"/searchResult"}>
                                    <p id={"category"}>
                                        Category
                                    </p>
                                </Link>
                            </li>
                            <span id="short_line"><br/>
                    <p id="short_text">
                        探す
                    </p>
                    </span>
                            <Link href={"/searchResult"}>

                                <li className={"Headersearch"}>
                                    Search <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-search">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.3-4.3"/>
                                </svg>
                                </li>
                            </Link>
                            <span className="long_line"></span>

                            <Link href={"/listingScreen"}>

                                <li id="uru_ul">
                                    Sell
                                    <span id="uru">売る</span>

                                </li>
                            </Link>
                            <span className="long_line"></span>


                            <li>
                                {user ?
                                    <UserNavigationModal/>
                                : ""}

                            </li>
                            <li id={"UserName"}>
                                {user ? <p id={"usernameGet"}>{user.username}</p> :
                                    <Link href={"/login"}><p id={"name"}>ログイン</p></Link>}
                                {/*確認用　ネーム上限15*/}
                                {/*<p id={"usernameGet"}>123456789012345</p>*/}
                            </li>
                            <li id={"list_bell"}>
                                {user ?
                                    <div>
                                        <Button className={"bell"} onClick={handleOpen}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="lucide lucide-bell">
                                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                                            </svg>
                                        </Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"

                                        >
                                            <Box className={"modal-content"}>
                                                <Box sx={{width: '100%'}}>

                                                    <Box className={"modal-title"}
                                                         sx={{borderBottom: 1, borderColor: 'error'}}>

                                                        <div className={"modal-title-tab"}>
                                                            <Tabs value={value} onChange={handleChange}>
                                                                <Tab style={{color: "#000"}}
                                                                     className={"modal-title-tab-text modalborder"}
                                                                     label="お知らせ" {...a11yProps(0)} />
                                                                <Tab style={{color: "#000"}}
                                                                     className={"modal-title-tab-text"}
                                                                     label="出品評価" {...a11yProps(1)} />
                                                            </Tabs>
                                                        </div>
                                                    </Box>

                                                    <CustomTabPanel value={value} index={0}>
                                                        <Box className={"alert"}>

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="40"
                                                                 height="40"
                                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                 stroke-width="2"
                                                                 stroke-linecap="round" stroke-linejoin="round"
                                                                 className="lucide lucide-bell">
                                                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                                                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                                                            </svg>
                                                            <p>
                                                                新しい商品が出品されました！
                                                            </p>
                                                            <hr/>
                                                        </Box>
                                                    </CustomTabPanel>
                                                    <CustomTabPanel value={value} index={1}>
                                                        <Box className={"alert"}>

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="40"
                                                                 height="40"
                                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                 stroke-width="2"
                                                                 stroke-linecap="round" stroke-linejoin="round"
                                                                 className="lucide lucide-bell">
                                                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                                                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                                                            </svg>
                                                            <p>
                                                                取引評価されました！
                                                            </p>
                                                            <hr/>
                                                        </Box>

                                                    </CustomTabPanel>

                                                </Box>

                                            </Box>
                                        </Modal>
                                    </div>
                                    : ""}
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="under_bar"></span>
            </header>

        </>
    );
}


export default Header;
