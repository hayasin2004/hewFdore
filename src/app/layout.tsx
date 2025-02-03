
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React, {ReactNode} from "react";
import NextAuthProvider from "../providers/NextAuth";

const inter = Inter({subsets: ["latin"]});
console.log(inter)




//
// const UserContext = createContext<UserContextProps | undefined>(undefined)

export const metadata: Metadata = {
    title: "F'dore",
    description: "日常に新しい彩を",
}
export default function RootLayout({children}: { children: ReactNode }) {
    // const [user, setUser] = useState<User | null>(null)
    return (
        <html lang="ja">
        <body>
        <NextAuthProvider>
            {/*<UserContext.Provider value={{user, setUser}}>*/}
                {children}
            {/*</UserContext.Provider>*/}
        </NextAuthProvider>
        </body>
        </html>
    );
}
// この例では、useUserフックを使用して、UserContextからuserとsetUserを取得し、ユーザー情報にアクセスしています。
// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (context === undefined){
//         throw new Error("useUser must be used within a UserProvider")
//     }
//         return context
// }
