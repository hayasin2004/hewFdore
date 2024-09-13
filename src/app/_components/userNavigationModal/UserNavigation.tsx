import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Header from "@/app/_components/header/Header";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import  Images from "next/image"
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
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
            <Button onClick={handleOpen}>プロフィールナビゲーション</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style, width: 500, height: 500}}>
                    <h2 id="child-modal-title">ユーザーナビゲーション</h2>
                    <p id="child-modal-description">
                        <Link href={"confirmUser"}>
                            プロフィール
                        </Link>

                    </p>
                    <p id="child-modal-description">
                        <Link href={"confirmPoints"}>
                            獲得ポイント履歴
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
                    <Button onClick={handleClose}>閉じる</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

const UserNavigation = () => {
    const user = useUser()
    const username = user.username


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
                <Images src={"/images/sampleIcon.jpg"}　style={{borderRadius : "50px"}} width={50} height={50}  alt={"サンプルユーザーアイコン"}/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{username}様</h2>
                    <p id="parent-modal-description">
                        保有ポイント 10pt
                    </p>
                    <ChildModal/>
                </Box>
            </Modal>
        </div>
    );
}

export default UserNavigation;
