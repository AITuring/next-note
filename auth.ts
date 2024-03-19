import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
// import Google from "next-auth/providers/google";
import { addUser, getUser, User } from '@/lib/redis';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: '密码登录',
      credentials: {
        username: { label: '邮箱', type: "text", placeholder: "请输入邮箱" },
        password: { label: '密码', type: "password", placeholder: "请输入密码"  }
      },
      // async authorize(credentials: Partial<Record<"username" | "password", unknown>>): Promise<User | null> {
      //   let user: User | null = null;

      //   // 调用 getUser 并处理返回值
      //   const getUserResult = await getUser(credentials.username, credentials.password);
      //   if (typeof getUserResult === 'number') {
      //     if (getUserResult === 1) return null; // 密码错误
      //     if (getUserResult === 0) {
      //       // 用户注册
      //       user = await addUser(credentials.username, credentials.password);
      //     }
      //   } else {
      //     user = getUserResult;
      //   }

      //   if (!user) {
      //     throw new Error("User was not found and could not be created.");
      //   }

      //   return user;
      // }
    }),
    Github({
      // clientId: process.env.GITHUB_ID,
      // clientSecret: process.env.GITHUB_SECRET,
    }),
    // Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
  ],
  callbacks: {
    authorized({request, auth}) {
      const {pathname} = request.nextUrl;
      if (pathname.startsWith('/note/edit')) {
        return !!auth;
      }
      return true;
    }
}
});
