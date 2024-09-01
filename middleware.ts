import {withAuth} from "next-auth/middleware";
import {loginUser} from "@/app/utils/loginUser"
import {NextResponse} from "next/server";

export default withAuth(
    async function middleware(req) {
        const token = localStorage.getItem("token")
        const isAuth = !!token /* !!二個はトークンがあるか否かの強制二択に絞る*/
        const isAuthpPage =
            req.nextUrl.pathname.startsWith("/topppage") ||
            req.nextUrl.pathname.startsWith("/login")

        if (isAuthpPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/toppage", req.url))
            }

            return null

            }
            if (!isAuth) {
                return NextResponse.redirect(new URL("/login", req.url))
        }


    }
)

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/toppage/:path', "/confirmUser/:path", "/login", "/user"]
}
//説明。これはトークンを持っているユーザー（ログインしたユーザー）のIDが:path*として扱われています。
//　つまり最終的には/toppage/ログインしたユーザーというリンクになります。
