import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/lib/Mongodb";
import { Account, User as AuthUser } from "next-auth";
import jwt, { getToken } from "next-auth/jwt"



export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "credentials") {
        if(account.access_token){
          return account.access_token
        }
        else{
          console.log("no access token")
        }
        return true ;
      }
      if (account?.provider === "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });
            
            await newUser.save();
            return true;
          }
          
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    async session({ session, user, token }:{session:any,user:any,token:any}) {
      // Customize the session object here if necessary
       // Add custom data to session object
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }:{session:any,user:any,token:any,account:any,profile:any,isNewUser:any}) {
      // Modify or add new fields to the JWT
      if (user) {
        token.id = user.id;  // For example, add user id to the JWT
      }
      let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
      token.exp = expirationTime;
      return token;
    }
    
  },
  
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
