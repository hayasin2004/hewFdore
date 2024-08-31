import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import type {NextAuthOptions} from "next-auth"


export const authOptions: NextAuthOptions = {

    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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