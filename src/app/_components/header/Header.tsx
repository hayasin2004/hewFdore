"use client"
import React from 'react';
import "./Heder.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Tab, Tabs} from "@mui/material";
import useUser from "@/hooks/useUser";

interface User{
    userId : string
    username : string
    email :string
    password :string
    profilePicture : string
    coverProfilePicture : string
}



const Header = () => {
    const { user } = useUser()
    console.log(user?.username)
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
        bgcolor: 'background.paper',
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
                        <h1>
                            F'dore
                        </h1>
                    </div>
                    <div className="bar">
                        <ul>
                            <li>
                                Category
                            </li>
                            <span id="short_line"><br/>
                    <p id="short_text">
                        探す
                    </p>
                    </span>
                            <li>
                                Search 〇
                            </li>
                            <span className="long_line"></span>
                            <li id="uru_ul">
                                Sell
                                <span id="uru">売る</span>

                            </li>
                            <span className="long_line"></span>

                            <li>
                                ○
                            </li>
                            <li>
                                {/*{user?.email}*/}
                            </li>
                            <li>
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

                                                    <Box className={"modal-title"} sx={{borderBottom: 1, borderColor: 'error'}}>

                                                            <div className={"modal-title-tab"}>
                                                        <Tabs value={value} onChange={handleChange}>
                                                                <Tab className={"modal-title-tab-text modalborder"}   label="お知らせ" {...a11yProps(0)} />
                                                                <Tab  className={"modal-title-tab-text"} label="出品評価" {...a11yProps(1)} />
                                                        </Tabs>
                                                            </div>
                                                    </Box>

                                                <CustomTabPanel  value={value} index={0}>
                                                    <Box className={"alert"}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
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

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
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
