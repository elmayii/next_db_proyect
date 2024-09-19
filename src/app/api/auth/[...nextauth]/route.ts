import { EditUser } from "@/interfaces/User";
import prisma from "@/lib/prisma";
import NextAuth, { Session, NextAuthOptions } from "next-auth";
import CredentialsProvide from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvide({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.usuario.findFirst({
            where: {
              nom_usuario: credentials?.username,
              password: credentials?.password,
            },
          });
          if (!user) throw new Error("Invalid credentials");

          // If no error and we have user data, return it
          if (user) {
            const resultUser = { ...user, id: user.id_usuario.toString() };
            return resultUser;
          }
        } catch (e) {
          console.log(e);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      const userSession = user as unknown as EditUser;
      if (userSession && userSession.id_rol)
        token.id_rol = userSession.id_rol;
      return token;
    },
    session: ({ session, token }) => {
      const user = session.user as EditUser;
      if (user && token && token.id_rol)
        user.id_rol = token.id_rol as number;
      return user as unknown as Session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
