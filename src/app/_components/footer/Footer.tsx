import React from 'react';
import "./Footer.css"
import Image from "next/image";
import Chat from "@/app/_components/chat/Chat";

const Footer = () =>{
    return(
        <div id="footer">
            <div id="links">
                <p>
                    <span>利用規約</span>
                    <span>プライバシーポリシー</span>
                    <span>特定商取引法に基づく表示</span>
                    <span>資金決済法に関する表記に基づく表示</span>
                </p>
            </div>
            <p id="c">&copy; 2024-2025 F&apos;dore</p>
        </div>
    );

}

export default Footer;