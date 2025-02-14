import {withAuth} from "next-auth/middleware";
import { NextResponse} from "next/server";

export default withAuth(
    async function middleware(req) {
        const token = await localStorage.getItem("token");
        const isAuthPage =
            req.nextUrl.pathname.startsWith("/topppage") ||
            req.nextUrl.pathname.startsWith("/login")

        if (isAuthPage) {
            if (token) {
                return NextResponse.redirect(new URL("/toppage", req.url))
            }

            return null

        }
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url))
        }

},{
        callbacks :{
            async authorized() {
                return true
            }
        }
    }
)

export const config = {
    matcher: ['/toppage', "/confirmUser/:path", "/login", "/user"]
}
