import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import FacebookProvider from "next-auth/providers/facebook"
import type {NextAuthOptions} from "next-auth"
import {connectDB} from "@/lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials";
// allowDangerousEmailAccountLinking: true, →これは複数のプロバイダーで同じメールアドレスでログインしたときに衝突が起きないようにするもの。これをfalseにすると同じメールアドレスでログインはできなくなります。


interface Credentials {
    email: string;
    password: string;
}


export const authOptions: NextAuthOptions = {

    secret: process.env.NEXTAUTH_SECRET,
    providers: [
       // CredentialsProvider({
       //      name : "Credentials",
       //      id : "credentials",
       //      credentials : {
       //          email : { label:"Email" , type : "text" },
       //          password:{ label:"Password" , type : "password" },
       //      },
       //      async authorize({email, password} : {email : string , password : string}) {
       //          await connectDB();
       //          const user = await  User.findOne({email : credentials.email})
       //      },
       //  }),
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
            console.log(session)　/*→　これでユーザー情報の一覧がコンソールに出ます。*/
            return session
        },

    },
    session : {
        strategy : "jwt"
    }

}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}