import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/users";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.User.email,
      });
      session.User.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        //serverless function
        await connectToDB();
        // check if a user exit
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return;
      } catch (error) {
        console.log("Connection Failed xx =".error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
