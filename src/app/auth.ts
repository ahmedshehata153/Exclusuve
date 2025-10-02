import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "user@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await res.json();
          const decode = JSON.parse(atob(data.token.split(".")[1]));

          return {
            id: decode.id,
            user: data.user,
            token: data.token,
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
