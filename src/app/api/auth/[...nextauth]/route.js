import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import Userservices from "services/Userservices";
import { connectMongoDB } from "../../../../lib/mongodb";

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials) {

            const { email, password } = credentials;

            try {

                await connectMongoDB();
                const user = await Userservices.finduserbyemail(email);

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                console.log(user);
                return user;

            } catch(error) {
                console.log("Error: ", error)
            }

          }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {

            if (user) {
                return {
                    ...token,
                    id: user._id,
                    role: user.role
                }
            }

            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }