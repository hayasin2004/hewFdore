"use client"
import React, {useEffect, useState} from 'react';
import "./Heder.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Tab, Tabs} from "@mui/material";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import UserNavigationModal from "@/app/_components/userNavigationModal/UserNavigation";
import confirmUser from "@/app/utils/user/confirmUser";
import catchToastProduct from "@/app/utils/toast/catchToastProduct";
import catchOtherToast from "@/app/utils/toast/catchOtherToast";
import {ToastType} from "@/models/Toast";
import {UserType} from "@/app/api/user/catchUser/route";
import Image from "next/image"

const Header = () => {

    const [userData, setUserData] = useState<UserType | null>(null)
    const [toastPurchase, setToastPurchase] = useState<ToastType[] | null>([])
    const [otherToast, setOtherToast] = useState<ToastType[] | null>([])
    const [token, setToken] = useState<string | null>(null)

    const user = useUser(token)
    useEffect(() => {

        if (typeof window !== "undefined") {
            // Your code that accesses localStorage
            const data = localStorage.getItem("token");
            setToken(data)
        }
    }, []);

    useEffect(() => {
        if (token) {

            const confirmUserData = async () => {
                const response = await confirmUser(token)
                // console.log("バグったかも"+response)
                if (response !== undefined) {
                    const responseParse = JSON.parse(response!)
                    setUserData(responseParse)
                }
            }
            confirmUserData()
        }

    }, [user, token]);


    useEffect(() => {

        const toastPurchase = async () => {

            if (userData?._id !== undefined) {
                const response = await catchToastProduct(userData?._id)
                if (response !== undefined) {
                    const responseParse = JSON.parse(response!)
                    setToastPurchase(responseParse)
                }
            }
        }
        const OtherToast = async () => {

            if (userData?._id !== undefined) {
                const response = await catchOtherToast(userData?._id)
                if (response !== undefined) {
                    const responseParse = JSON.parse(response!)
                    setOtherToast(responseParse)
                }
            }
        }
        toastPurchase()
        OtherToast()
    }, [userData]);


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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 768);
        }
    }, []);

    return (
        <>

            <header>
                <div className="nav">
                    <div className="title">
                        <Link className={"logoFrame"} href={"/"}>
                            <Image src={"/AFdore1CF.png"} className={"logoImage"} width={640} height={480}
                                   alt={"logo"}/>
                            <Image src={"/AFdore2CF.png"} className={"logoImage2"} width={640} height={480}
                                   alt={"logo"}/>
                        </Link>
                    </div>
                    <div className="bar">
                        <ul>
                            <li className={"categoryFrame"}>
                                <Link className={"caregoryLogoBase"} href={"/searchResult"}>
                                    <div className={"categoryLogoFrame"}>
                                        <Image src={"/Tシャツアイコン7.png"} className={"categoryImage"} width={256} height={256}
                                               alt={"logo"}/>
                                    </div>
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
                            <Link className={"searchFrame"} href={"/searchResult"}>

                                <li className={"Headersearch"}>

                                    <div className="lucidelucide-search2">
                                        <Image src={"/虫眼鏡の無料アイコン10.png"} className={"searchImage"} width={256} height={256}
                                               alt={"logo"}/>
                                    </div>
                                    <div id={"megane"}>
                                        <p id={"search"}>Search</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="lucidelucide-search">
                                            <circle cx="11" cy="11" r="8"/>
                                            <path d="m21 21-4.3-4.3"/>
                                        </svg>
                                    </div>

                                </li>
                            </Link>
                            <span className="long_line"></span>

                            <Link className={"seleFrame"} href={"/listingScreen"}>

                                <li id="uru_ul">
                                    <div className="sellImageFrame">
                                        <Image src={"/段ボール箱　11.png"} className={"seleImage"} width={256}
                                               height={256}
                                               alt={"logo"}/>
                                    </div>
                                    <p id={"sell"}>Sell</p>
                                    <span id="uru">売る</span>

                                </li>
                            </Link>
                            <span className="long_line"></span>


                            <li className={"iconFrame"}>
                                {userData?.profilePicture !== "" ?
                                    <UserNavigationModal src={userData?.profilePicture}/>
                                    :
                                    <UserNavigationModal src="/"/>
                                }

                            </li>
                            {isDesktop ? (

                            <li>
                                {userData ? <p id={"name"}>{userData?.username}</p> :
                                    <Link href={"/login"}><p id={"name"} >ログイン</p></Link>}
                                {/*確認用　ネーム上限15*/}
                                {/*<p id={"usernameGet"}>123456789012345</p>*/}
                            </li>
                            ): (

                                <li className={"loginFrame"}>
                                    {userData ? "" :
                                        <Link href={"/login"}><p id={"name"}>ログイン</p></Link>}
                                    {/*確認用　ネーム上限15*/}
                                    {/*<p id={"usernameGet"}>123456789012345</p>*/}
                                </li>
                            )}
                            <li id={"list_bell"}>
                                {userData ?
                                    <div className={"reaa"}>
                                        <Button className={"bell"} onClick={handleOpen}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round"
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

                                                            {otherToast?.map((item) => (
                                                                <div key={item._id} className={"alertDisplay"}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40"
                                                                         height="40"
                                                                         viewBox="0 0 24 24" fill="none"
                                                                         stroke="currentColor"
                                                                         strokeWidth="2"
                                                                         strokeLinecap="round" strokeLinejoin="round"
                                                                         className="lucide lucide-bell">
                                                                        <path
                                                                            d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                                                                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                                                                    </svg>
                                                                    {item.followerUserId !== "" ?
                                                                        <Link className={"bellM"}
                                                                            href={`/userDetail/${item.followerUserId}`}>
                                                                            <p>{item.message}</p>
                                                                        </Link>
                                                                        :
                                                                        <p>{item.message}</p>
                                                                    }
                                                                    <hr/>
                                                                </div>
                                                            ))}
                                                        </Box>
                                                    </CustomTabPanel>
                                                    <CustomTabPanel value={value} index={1}>
                                                        <Box className={"alert"}>

                                                            {toastPurchase?.map((item) => (
                                                                <div key={item._id} className={"alertDisplay"}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40"
                                                                         height="40"
                                                                         viewBox="0 0 24 24" fill="none"
                                                                         stroke="currentColor"
                                                                         strokeWidth="2"
                                                                         strokeLinecap="round" strokeLinejoin="round"
                                                                         className="lucide lucide-bell">
                                                                        <path
                                                                            d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                                                                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                                                                    </svg>
                                                                    {item.tradeId !== "" ?
                                                                        <Link href={`/tradeChat/${item.tradeId}`}>
                                                                            <p>{item.message}</p>
                                                                        </Link>
                                                                        :
                                                                        <Link href={`/product/${item.productId}`}>
                                                                            <p>{item.message}</p>
                                                                        </Link>}
                                                                </div>
                                                            ))}
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
