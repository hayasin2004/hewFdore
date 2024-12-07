"use client"

import Image from "next/image";
import {useState} from "react";
import './Gmail.css'

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    console.log(verificationCode)
    const [userInputCode, setUserInputCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [showVerification, setShowVerification] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const res = await fetch('/api/contact/',{
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,message,verificationCode}),
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
        if (userInputCode === verificationCode){
            setIsVerified(true);
            setStatus('認証が完了しました！');
        } else {
          setStatus('認証コードが一致しません。もう一度お試しください。');
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2 className="title">Next.js Gmailアプリ</h2>

                {!showVerification ? (
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="name" className="label">
                                お名前
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="label">
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="label">
                                メッセージ
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="textarea"
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