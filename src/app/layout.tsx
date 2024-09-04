import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React, {createContext, ReactNode, useContext, useState} from "react";
import NextAuthProvider from "../providers/NextAuth";

const inter = Inter({subsets: ["latin"]});

// Userインターフェースは、ユーザー情報の型を定義
interface User {
    userId: string
    username: string
    email: string
    password: string
    profilePicture: string
    coverProfilePicture: string
}

// UserContextPropsインターフェースは、コンテキストで共有する値の型を定義しています。userとsetUserの2つのプロパティを持っています。
interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)


export const metadata: Metadata = {
    title: "F'dore",
    description: "日常に新しい彩を",
}
export default function RootLayout({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    return (
        <html lang="ja">
        <body>
        <NextAuthProvider>
            <UserContext.Provider value={{user, setUser}}>
                {children}
            </UserContext.Provider>
        </NextAuthProvider>
        </body>
        </html>
    );
}
// この例では、useUserフックを使用して、UserContextからuserとsetUserを取得し、ユーザー情報にアクセスしています。
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined){
        throw new Error("useUser must be used within a UserProvider")
    }
        return context
}
