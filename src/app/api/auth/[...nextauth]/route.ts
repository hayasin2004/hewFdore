import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import FacebookProvider from "next-auth/providers/facebook"
import type {NextAuthOptions} from "next-auth"

            // allowDangerousEmailAccountLinking: true, →これは複数のプロバイダーで同じメールアドレスでログインしたときに衝突が起きないようにするもの。これをfalseにすると同じメールアドレスでログインはできなくなります。

export const authOptions: NextAuthOptions = {

    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID!,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        })
    ], pages: {
        signIn: "/login",
    }, callbacks: {
        async session({token, session}) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            //     上記の型定義はtypes/next-auth.d.ts/

            }
            // console.log(session)　→　これでユーザー情報の一覧がコンソールに出ます。
            return session

        },

    }

}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}