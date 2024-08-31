import {User} from "next-auth";

type  UserId   = string

// declareは型をグローバルに宣言しているもの
declare module  "next-auth/jwt" {
    interface JWT {
        id : UserId
    }
}

declare module "next-auth"{

    interface Session {
        user : User & {}
    }
}
