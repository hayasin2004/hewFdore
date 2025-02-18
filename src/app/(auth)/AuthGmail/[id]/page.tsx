"use client"

import Image from "next/image";
import {useEffect, useState} from "react";
import './AuthGmail.css'
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";
import jwt from "jsonwebtoken";
import confirmToken from "@/app/utils/user/confirmToken";

const AuthGmail = ({params}: { params: { id: string } }) => {
    const router = useRouter();
    const [email, setEmail] = useState(params);
    const [password, setPassword] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [userInputCode, setUserInputCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    console.log(email)
    useEffect(() => {
        const verifyTenMinToken = async () => {
            const TenMinToken: string | null = await localStorage.getItem("TenMinToken");
            if (TenMinToken !== null) {
                try {
                    const decoded = await confirmToken(TenMinToken);
                    console.log(decoded)
                    if (decoded !== null ) {
                        console.log(typeof decoded)
                        setEmail(decoded.email)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            // if (!secretKey){
            //     console.log("secretKey not set");
            // }

        }
        verifyTenMinToken()
    }, []);


    console.log(verificationCode)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const res = await fetch('/api/contact/', {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password, verificationCode}),
            });

            const result = await res.json();
            if (result.status === 'Success') {
                setStatus('確認コードをメールで送信しました！');
                setVerificationCode(result.code);
                setShowVerification(true);
            } else {
                setStatus('メッセージの送信に失敗しました');
            }
        } catch (error) {
            setStatus('エラーが発生しました');
            console.log(error);
        }
    };

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInputCode === verificationCode) {
            setIsVerified(true);
            localStorage.removeItem("TenMinToken")
            setStatus('認証が完了しました！');
            window.alert("接続が完了次第ログイン画面に遷移します。OKボタンを押して、今しばらくお待ちください")
            setTimeout(() => {
                router.push("/login")
            }, 3000)
        } else {
            setStatus('認証コードが一致しません。もう一度お試しください。');
        }
    };
    return (
        <div className="container" style={{
            backgroundImage: 'url(/images/flower_a.png)'
        }}>

            <div className="form-wrapper">
                <h2 className="title">メール認証</h2>

                {!showVerification ? (
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="name" className="label">
                                ログインメールアドレス
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={email}
                                required
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="label">
                                パスワード
                            </label>
                            <input
                                type="password"
                                value={password}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input"
                            />
                        </div>


                        <button
                            type="submit"
                            className="button submit-button"
                        >
                            メール送信
                        </button>
                    </form>
                ) : !isVerified ? (
                    <form onSubmit={handleVerification} className="form">
                        <div className="form-group">
                            <label htmlFor="verificationCode" className="label">
                                確認コードを入力してください
                            </label>
                            <input
                                type="text"
                                id="verificationCode"
                                value={userInputCode}
                                onChange={(e) => setUserInputCode(e.target.value)}
                                required
                                className="input"
                            />
                        </div>

                        <button
                            type="submit"
                            className="button verify-button"
                        >
                            確認
                        </button>
                    </form>
                ) : (
                    <div className="success-message">
                        認証が完了しました！
                    </div>
                )}

                {status && (
                    <p className="status">
                        {status}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthGmail