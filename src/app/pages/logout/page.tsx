import React from 'react';
import Header from "@/app/_components/header/Header";
import "./logout.css"
const Logout = () => {

    return (
        <>
            <Header/>

            <main>
                <div id="wrap">

                    <p>
                        ログアウトしました
                    </p>
                    <div id="logout">
                        <a href="#">
                            ログインページに戻る
                        </a>
                    </div>


                </div>
            </main>
        </>
    );
}


export default Logout;