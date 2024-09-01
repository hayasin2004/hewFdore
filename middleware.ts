import {withAuth} from "next-auth/middleware";
import {getToken} from "next-auth/jwt";

export default withAuth(
    async function middleware(req) {
        const token = await  getToken({ req })
}

)

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/toppage/:path', "/confirmUser/:path","/login","/user"]
}
//説明。これはトークンを持っているユーザー（ログインしたユーザー）のIDが:path*として扱われています。
//　つまり最終的には/toppage/ログインしたユーザーというリンクになります。
