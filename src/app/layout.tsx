import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import NextAuthProvider from "../providers/NextAuth";

const inter = Inter({subsets: ["latin"]});


export const metadata: Metadata = {
    title: "F'dore",
    description: "日常に新しい彩を",
}
export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="ja">
        <body>
            <NextAuthProvider>{children}</NextAuthProvider>

        </body>
        </html>
    );
}
